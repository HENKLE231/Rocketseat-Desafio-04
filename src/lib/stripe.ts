import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
    appInfo: {
        name: 'Ignite Shop',
    },
})

export interface ProductType {
    id: string,
    name: string,
    price: number,
    priceId: string,
    description: string,
    imageUrl: string,
}

// Desta forma pude usar o revalidate
export const fetchProducts = async () => {
    const fetchSettings = {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + process.env.STRIPE_SECRET_KEY,
        },
        next: {
            revalidate: 60 * 60 * 2
        },
    }

    const productsResponse = await fetch("https://api.stripe.com/v1/products", fetchSettings)
    const productsResponseJson = await productsResponse.json()
    const productsData: Stripe.Product[] = productsResponseJson.data

    const pricesResponse = await fetch("https://api.stripe.com/v1/prices", fetchSettings)
    const pricesResponseJson = await pricesResponse.json()
    const pricesData: Stripe.Price[] = pricesResponseJson.data

    const productList: ProductType[] = productsData.map((product) => {
        const priceObject = pricesData.find((price) => price.id == product.default_price);

        return {
            id: product.id,
            name: product.name,
            price: priceObject!.unit_amount! / 100,
            priceId: priceObject!.id,
            description: product.description ? product.description : '',
            imageUrl: product.images[0],
        }
    })

    return productList
}

export const fetchProductById = async (id: string) => {
    const fetchSettings = {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + process.env.STRIPE_SECRET_KEY,
        },
        next: {
            revalidate: 60 * 60 * 1
        },
    }

    const productResponse = await fetch("https://api.stripe.com/v1/products/" + id, fetchSettings)
    if (productResponse.status == 200) {
        const productData: Stripe.Product = await productResponse.json()
        const priceResponse = await fetch("https://api.stripe.com/v1/prices/" + productData.default_price, fetchSettings)
        const priceData: Stripe.Price = await priceResponse.json()
    
        const product: ProductType = {
            id: productData.id,
            name: productData.name,
            price: priceData!.unit_amount! / 100,
            priceId: priceData!.id,
            description: productData.description ? productData.description : '',
            imageUrl: productData.images[0],
        }
        return product
    } else {
        throw new Error('Produto não encontrado.');
    }
}

export const fetchSessionInfo = async (sessionId: string) => {
    const session = await stripe.checkout.sessions.retrieve(
        sessionId,
        {expand: [
            'line_items',
            'line_items.data.price.product'
        ]}
    )

    const customerFirstName = session.customer_details!.name?.split(' ')[0]
    const data = session.line_items!.data
    
    const productsImages = data.map((product) => {
        const wholeProduct = product.price?.product as unknown as Stripe.Product
        return wholeProduct.images[0]
    })


    return {
        customerName: customerFirstName,
        images: productsImages,
        quantity: productsImages.length
    }
}
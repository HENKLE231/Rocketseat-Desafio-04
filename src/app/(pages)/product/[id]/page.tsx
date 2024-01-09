import { ProductType, fetchProductById } from "@/lib/stripe"
import ProductDisplay from "./components/ProductDisplay"
import { Metadata } from "next"

interface ProductProps {
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: ProductProps): Promise<Metadata> {
    const {name}: ProductType = await fetchProductById(params.id)
    return {title: name}
}

export default async function Product({ params }: ProductProps) {
    let product: ProductType

    try {
        product = await fetchProductById(params.id)
    } catch (e) {
        const error = e as Error
        return <h3>{error.message}</h3>
    }
    
    return <ProductDisplay params={{product}} />
}
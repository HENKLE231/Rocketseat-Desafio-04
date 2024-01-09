"use client"
import { ImageContainer, ProductContainer, ProductDetails } from "@/app/styles/components/productDisplay"
import Image from "next/image"
import { ProductType } from "@/lib/stripe"
import { useContext } from 'react'
import { ShopContext } from "@/contexts/ShopContext"
import { priceFormatter } from "@/util/formatter"

interface ProductDisplayProps {
    params: {
        product: ProductType
    }
}

export default function ProductDisplay({ params }: ProductDisplayProps) {
    const { addProductToShoppingCart } = useContext(ShopContext)
    
    const product = params.product

    function handleAddToShoppingCart() {
        addProductToShoppingCart(product)
    }
    
    return (
        <ProductContainer>
            <ImageContainer>
                <Image
                    src={product.imageUrl}
                    width={520}
                    height={480}
                    alt=""
                />
            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{priceFormatter.format(product.price)}</span>

                <p>{product.description}</p>

                <button onClick={handleAddToShoppingCart}>
                    Colocar na sacola
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}
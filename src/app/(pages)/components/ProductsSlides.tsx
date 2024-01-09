"use client"
import {
    Product,
    HomeContainer,
    AddToCartButton,
    ProductCard
} from "../../styles/components/productsSlides";
import Image from "next/image";
import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ProductType } from "@/lib/stripe";
import { Handbag } from "@phosphor-icons/react/dist/ssr";
import { useContext } from "react";
import { ShopContext } from "@/contexts/ShopContext";
import { priceFormatter } from "@/util/formatter";

interface ProductSlidesProps {
    products: ProductType[]
}

export function ProductsSlides({products}: ProductSlidesProps) {
    const { addProductToShoppingCart } = useContext(ShopContext)

    const [sliderRef] = useKeenSlider({
        slides: {
            origin: 'center',
            perView: 3  ,
            spacing: 48
        }
    })

    function handleAddToShoppingCart(product: ProductType) {
        addProductToShoppingCart(product)
    }

    return (
        <HomeContainer ref={sliderRef} className="keen-slider">
            {
                products.length > 0 ?
                    products.map((product) => {
                        return (
                            <ProductCard className="keen-slider__slide">
                                <Link
                                    href={`/product/${product.id}`}
                                    key={product.id}
                                    prefetch={false}
                                >
                                    <Product>
                                        {
                                            product.imageUrl &&
                                                <Image
                                                    src={product.imageUrl}
                                                    width={520}
                                                    height={480}
                                                    alt=""
                                                />
                                        }
                                    </Product>
                                </Link>
                                <footer>
                                    <div>
                                        <h3>{product.name}</h3>
                                        <h2>{priceFormatter.format(product.price)}</h2>
                                    </div>
                                    <AddToCartButton title="Adicionar ao carrinho" onClick={() => handleAddToShoppingCart(product)}>
                                        <Handbag weight="bold" />
                                    </AddToCartButton>
                                </footer>
                            </ProductCard>
                        )
                    }) : 
                    <h3>Erro ao carregar produtos</h3>
            }
        </HomeContainer>
    )
}
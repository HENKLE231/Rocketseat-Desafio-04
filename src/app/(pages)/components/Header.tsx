"use client"
import Link from "next/link";
import {
    CloseButtonContainer,
    InfoContainer,
    ProductDisplay,
    ShoppingCartContainer,
    HeaderContainer,
    Toggler,
    ShoppingCartProductsAmount,
    ImgFrame,
    ProductInfo,
    ProductList,
    TotalInfoDisplay,
    CheckoutButton
} from "@/app/styles/components/header";
import logoImg from '../../../assets/logo.svg';
import Image from 'next/image';
import { Handbag, X } from "@phosphor-icons/react/dist/ssr";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "@/contexts/ShopContext";
import { ProductType } from "@/lib/stripe";
import { priceFormatter } from "@/util/formatter";
import axios from "axios";

interface HeaderProps {
    products: ProductType[]
}

export function Header({products}: HeaderProps) {
    const {
        shoppingCartProducts,
        removeProductFromShoppingCart,
        getTotal,
        isShoppingCartEmpty,
    } = useContext(ShopContext)

    function handleRemoveProduct(product: ProductType) {
        removeProductFromShoppingCart(product)
    }

    const itemsInShoppingCartPhrase = `${shoppingCartProducts.length} ite${shoppingCartProducts.length <= 1 ? 'm' : 'ns'}`

    const [isCheckoutDisable, setIsCheckoutDisable] = useState(isShoppingCartEmpty())

    useEffect(() => {
        setIsCheckoutDisable(isShoppingCartEmpty())
    }, [shoppingCartProducts])

    async function handleCheckout() {
        if (isShoppingCartEmpty()) {
            alert('Sacola de compras vazia.')
            return
        }

        try {
            setIsCheckoutDisable(true)
            const priceIds = shoppingCartProducts.map((product) => {
                return product.priceId
            })
    
            const res = await axios.post(
                'http://localhost:3000/api/checkout',
                {priceIds: priceIds}
            )
    
            const { checkoutUrl } = res.data
            window.location.href = checkoutUrl
        } catch (e) {
            // Conecar com uma ferramenta de observabilidade (Datadog / Sentry)
            setIsCheckoutDisable(false)
            alert('Falha ao redirecionar ao checkout!')
        }
    }

    return (
        <HeaderContainer>
            <Link href={`/`} title='Home'>
                <Image src={logoImg} alt="" />
            </Link>
            <>
                <Toggler title="Sacola">
                    <label htmlFor="openedShoppingCart">
                        <Handbag weight="bold" />
                        {
                            shoppingCartProducts.length > 0 &&
                                <ShoppingCartProductsAmount>
                                    {shoppingCartProducts.length}
                                </ShoppingCartProductsAmount>
                        }
                    </label>
                </Toggler>
                
                
                <ShoppingCartContainer>
                    <div>
                        <input type="checkbox" id="openedShoppingCart" />
                        <CloseButtonContainer>
                            <button title="Fechar sacola">
                                <label htmlFor="openedShoppingCart">
                                    <X size={24} />
                                </label>
                            </button>
                        </CloseButtonContainer>
                    </div>

                    <InfoContainer>
                        <div>
                            <h3>Sacola de compras</h3>

                            <ProductList>
                                {shoppingCartProducts.length > 0 &&
                                    shoppingCartProducts.map((product) => {
                                        return (
                                            <ProductDisplay key={product.id}>
                                                <ImgFrame>
                                                    <Image
                                                        src={product.imageUrl}
                                                        width={100}
                                                        height={100}
                                                        alt=""
                                                    />
                                                </ImgFrame>
                                                    <ProductInfo>
                                                        <p>{product.name}</p>
                                                        <h3>{priceFormatter.format(product.price)}</h3>
                                                        <button onClick={() => handleRemoveProduct(product)}>Remover</button>
                                                    </ProductInfo>
                                            </ProductDisplay>
                                        )
                                    }
                                )}
                            </ProductList>
                        </div>
                        <div>
                            <TotalInfoDisplay>
                                <div>
                                    <span>Quantidade</span>
                                    <span>{itemsInShoppingCartPhrase}</span>
                                </div>
                                <div>
                                    <span>Valor total</span>
                                    <span>{getTotal()}</span>
                                </div>
                            </TotalInfoDisplay>

                            <CheckoutButton
                                disabled={isCheckoutDisable}
                                onClick={handleCheckout}
                            >
                                Finalizar compra
                            </CheckoutButton>
                        </div>
                    </InfoContainer>
                </ShoppingCartContainer>
            </>
        </HeaderContainer>
    )
}
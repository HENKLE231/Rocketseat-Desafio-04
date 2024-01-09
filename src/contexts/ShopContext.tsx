'use client';
import { ProductType, fetchProducts } from "@/lib/stripe";
import {
    addProductAction,
    clearShoppingCartAction,
    removeProductAction
} from "@/reducers/shoppingCart/actions";
import { shoppingCartReducer } from "@/reducers/shoppingCart/reducers";
import { priceFormatter } from "@/util/formatter";
import {
    createContext,
    ReactNode,
    useReducer,
    useEffect
} from "react"

interface ShopContextType {
    shoppingCartProducts: ProductType[],
    addProductToShoppingCart: (product: ProductType) => void,
    removeProductFromShoppingCart: (product: ProductType) => void,
    clearShoppingCart: () => void,
    isShoppingCartEmpty: () => boolean,
    getTotal: () => string,
}

interface ShopContextProviderProps {
    children: ReactNode,
}

export const ShopContext = createContext({} as ShopContextType)

export function ShopContextProvider({children}: ShopContextProviderProps) {
    const [ShoppingCartState, ShoppingCartDispatch] = useReducer(
        shoppingCartReducer,
        {
            products: [] as ProductType[]
        },
        // (initialState) => {
        //     if (typeof window !== 'undefined') {
        //         const storedStateAsJSON = localStorage.getItem(
        //             '@react-04-ignite-shop:shopping-cart-state-1.0.0',
        //         )
          
        //         if (storedStateAsJSON) {
        //             return JSON.parse(storedStateAsJSON)
        //         }
        //     }
      
        //     return initialState
        // }
    )
    
    // useEffect(() => {
    //     const stateJSON = JSON.stringify(ShoppingCartState)
    //     localStorage.setItem('@react-04-ignite-shop:shopping-cart-state-1.0.0', stateJSON)
    // }, [ShoppingCartState])

    const shoppingCartProducts = ShoppingCartState.products

    function addProductToShoppingCart(product: ProductType) {
        ShoppingCartDispatch(addProductAction(product))
    }

    function removeProductFromShoppingCart(product: ProductType) {
        ShoppingCartDispatch(removeProductAction(product))
    }

    function clearShoppingCart() {
        ShoppingCartDispatch(clearShoppingCartAction())
    }

    function isShoppingCartEmpty() {
        return ShoppingCartState.products.length == 0
    }

    function getTotal() {
        if (ShoppingCartState.products.length == 0) {
            return priceFormatter.format(0)
        }

        console.log('ShopContext.tsx getTotal() ShoppingCartState.products')
        for (let i = 0; i < ShoppingCartState.products.length; i++) {
            console.log(ShoppingCartState.products[i])
        }
        
        const prices = ShoppingCartState.products.map((product) => product.price)

        let total = prices.reduce((total, price) => {
            return total + price
        }, 0)

        return priceFormatter.format(total)
    }
    
    return (
        <ShopContext.Provider
            value={{
                shoppingCartProducts,
                addProductToShoppingCart,
                removeProductFromShoppingCart,
                clearShoppingCart,
                isShoppingCartEmpty,
                getTotal,
            }}
        >
            {children}
        </ShopContext.Provider>
    )
}
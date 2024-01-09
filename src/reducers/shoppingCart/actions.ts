import { ProductType } from "@/lib/stripe"

export enum ActionTypes {
    ADD_PRODUCT = 'ADD_PRODUCT',
    REMOVE_PRODUCT = 'REMOVE_PRODUCT',
    CLEAR_SHOPPING_CART = 'CLEAR_SHOPPING_CART'
}

export function addProductAction(product: ProductType) {
    return {
        type: ActionTypes.ADD_PRODUCT,
        payload: {product}
    }
}

export function removeProductAction(product: ProductType) {
    return {
        type: ActionTypes.REMOVE_PRODUCT,
        payload: {product}
    }
}

export function clearShoppingCartAction() {
    return {
        type: ActionTypes.CLEAR_SHOPPING_CART,
        payload: {}
    }
}

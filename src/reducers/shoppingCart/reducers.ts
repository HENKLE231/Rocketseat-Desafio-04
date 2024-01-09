import { produce } from 'immer'
import { ActionTypes } from './actions'
import { ProductType } from '@/lib/stripe'

interface ShoppingCartState {
    products: ProductType[]
}

interface ShoppingCartPayload {
    product?: ProductType,
}

interface ShoppingCartAction {
    type: string,
    payload: ShoppingCartPayload
}

export function shoppingCartReducer(
    state: ShoppingCartState,
    action: ShoppingCartAction
) {
    let product = action.payload.product
    let productIndex = -1
    let productIsInShoppingCart = false

    if (action.type != ActionTypes.CLEAR_SHOPPING_CART) {
        if (!product) {
            return state
        }

        productIndex = state.products.findIndex(
            (stateProduct) => stateProduct.id == product!.id
        )
        productIsInShoppingCart = productIndex >= 0
    }

    switch (action.type) {
        case ActionTypes.ADD_PRODUCT: {
            // Verifica se já esta no carrinho, senão adiciona.
            return productIsInShoppingCart ?
                state :
                produce(state, (draft) => {
                    draft.products.push(product!)
                })
        }
        case ActionTypes.REMOVE_PRODUCT: {
            // Verifica se o produto já foi removido, senão remove
            return !productIsInShoppingCart ?
                state :
                produce(state, (draft) => {
                    draft.products.splice(productIndex, 1)
                })
        }
        case ActionTypes.CLEAR_SHOPPING_CART : {
            // Limpa o carrinho
            return produce(state, (draft) => {
                draft.products = []
            })
        }
        default: {
            return state
        }
    }
}

// export function getSubtotal(state: ShoppingCartState) {
//     const subtotal = state.shoppingCart.length > 0 ?
//     state.shoppingCart.reduce((totalAmount, productAmount) => totalAmount + (productAmount.amount * productAmount.product.price), 0) :
//     0
//     return subtotal
// }
import { CART_ADD_ITEM, CART_REMOVE_ITEM ,SAVE_PAYMENT_METHOD,SAVE_SHIPPING_ADDRESS} from '../constants/cartConstants' 

const initialState = {
    cartItems : []
}
function cartReducer(state=initialState,action) {
   
    switch (action.type) {
        case CART_ADD_ITEM:
            
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            
            if (existItem) {
                return {
                    ...state,
                    cartItems : state.cartItems.map(x => x.product === existItem.product ? item :x)
                }
                
            }
            else {
                return {
                    ...state,
                    cartItems : [...state.cartItems, action.payload]
                }
            }

            
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter( item => item.product !== action.payload) 
            }
    
        default:
            return state
    }
}

export default cartReducer


export const saveShipingAddressReducer = (state = {}, action) => {
    
    switch (action.type) {
        case SAVE_SHIPPING_ADDRESS:
            
            return {shipping : action.payload}
    
        default:
            return state  // imp load the the data from local
    }

}

export const savePaymentMethodReducer = (state = {}, action) => {

    switch (action.type) {
        case SAVE_PAYMENT_METHOD:

            return { method: action.payload }

        default:
            return state  // imp load the the data from local
    }

}
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducers, productListReducers } from '../reducers/productReducers'
import cartReducer from '../reducers/cartReducer'

const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailsReducers,
    cart : cartReducer,

})

const cartItmesFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems') ) : []

const initialState = {
    cart: {
        cartItems : cartItmesFromStorage
    }

}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools( applyMiddleware(...middleware)))

export default store
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducers, productListReducers } from '../reducers/productReducers'
import cartReducer from '../reducers/cartReducer'
import { userLoginReducer } from '../reducers/userLoginReducer'


const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailsReducers,
    cart : cartReducer,
    userLogin : userLoginReducer
})

const cartItmesFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    cart: {
        cartItems : cartItmesFromStorage
    },

    userLogin: {
        userInfo : userInfoFromStorage
    }


}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools( applyMiddleware(...middleware)))

export default store
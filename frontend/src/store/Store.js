import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducers, productListReducers } from '../reducers/productReducers'
import cartReducer, { savePaymentMethodReducer, saveShipingAddressReducer } from '../reducers/cartReducer'
import { userLoginReducer } from '../reducers/userLoginReducer'
import { userRegisterReducer } from '../reducers/userRegisterReducer'
import { userProfileReducer, userUpdateProfileReducer } from '../reducers/userProfileReducer'


const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailsReducers,
    cart : cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    shippingAddress: saveShipingAddressReducer,
    paymentMethod : savePaymentMethodReducer,
})

const cartItmesFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')) : null

console.log('Shipping adress from local ..', shippingAddressFromStorage);
console.log('userinfo from local ..', userInfoFromStorage);



const initialState = {
    cart: {
        cartItems : cartItmesFromStorage
    },

    userLogin: {
        userInfo : userInfoFromStorage
    },

    shippingAddress: {
        shipping: shippingAddressFromStorage
    },
    

}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools( applyMiddleware(...middleware)))

export default store
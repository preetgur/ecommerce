import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducers, productListReducers } from '../reducers/productReducers'
import cartReducer, { savePaymentMethodReducer, saveShipingAddressReducer } from '../reducers/cartReducer'
import { userLoginReducer } from '../reducers/userLoginReducer'
import { userRegisterReducer } from '../reducers/userRegisterReducer'
import { userProfileReducer, userUpdateProfileReducer } from '../reducers/userProfileReducer'
import {  myOrderReducer, orderDetailReducer, orderListReducer, orderPayReducer, orderReducer, orderToDeliveredReducer } from '../reducers/orderReducer'
import {userListReducer} from '../reducers/userListReducer'
import { deleteUserReducer } from '../reducers/deleteUserReducer'
import { userUpdateAdminReducer, userGetAdminReducer} from '../reducers/userUpdateAdminReducer'
import { deleteProductReducer } from '../reducers/deleteProductReducer'
import { updateProductReducer } from '../reducers/updateProductReducer'


const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailsReducers,
    deleteProduct: deleteProductReducer,
    updateProduct: updateProductReducer,

    cart : cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    shippingAddress: saveShipingAddressReducer,
    paymentMethod: savePaymentMethodReducer,

    order: orderReducer,
    orderDetail: orderDetailReducer,
    orderPay: orderPayReducer,
    myOrder: myOrderReducer,
    orderList: orderListReducer,
    orderToDelivered : orderToDeliveredReducer,

    userList: userListReducer,
    deleteUser: deleteUserReducer,
    userUpdateAdmin: userUpdateAdminReducer,
    userGetAdmin: userGetAdminReducer

})

const cartItmesFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')) : null

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null

console.log('Shipping adress from local ..', shippingAddressFromStorage);
console.log('userinfo from local ..', userInfoFromStorage,paymentMethodFromStorage);



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
    
    paymentMethod: {
        method : paymentMethodFromStorage
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools( applyMiddleware(...middleware)))

export default store
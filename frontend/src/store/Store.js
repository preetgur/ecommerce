import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducers, productListReducers } from '../reducers/productReducers'

const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailsReducers,

})
const initialState = {
    ab : [],
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools( applyMiddleware(...middleware)))

export default store
import {
    TOP_PRODUCT_FAIL,
    TOP_PRODUCT_REQUEST,
    TOP_PRODUCT_SUCCESS
} from "../constants/productConstants"

export const topProductReducer = (state = {}, action) => {

    switch (action.type) {

        case TOP_PRODUCT_REQUEST:
            return { loading: true}

        case TOP_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }

        case TOP_PRODUCT_FAIL:
            return { loading: false, error: action.payload }


        default:
            return state
    }
}


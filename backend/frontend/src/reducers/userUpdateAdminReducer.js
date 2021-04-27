import {
    USER_UPDATE_ADMIN_REQUEST,
    USER_UPDATE_ADMIN_SUCCESS,
    USER_UPDATE_ADMIN_FAIL,

    USER_GET_ADMIN_REQUEST,
    USER_GET_ADMIN_SUCCESS,
    USER_GET_ADMIN_FAIL,
    USER_UPDATE_ADMIN_RESET

} from '../constants/userConstants'


export const userGetAdminReducer = (state = {user:{}}, action) => {

    console.log('### user get admin reducer .. ### ', action);

    switch (action.type) {
        case USER_GET_ADMIN_REQUEST:
            return { loading: true }

        case USER_GET_ADMIN_SUCCESS:
            return { loading: false, user: action.payload ,success:true }

        case USER_GET_ADMIN_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const userUpdateAdminReducer = (state = {updateUser:{}}, action) => {

    switch (action.type) {
        case USER_UPDATE_ADMIN_REQUEST:
            return { loading: true }

        case USER_UPDATE_ADMIN_SUCCESS:
            return { loading: false, users: action.payload ,success:true}

        case USER_UPDATE_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        
        case USER_UPDATE_ADMIN_RESET:
            return {}

        default:
            return state
    }
}


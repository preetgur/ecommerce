import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS } from "../constants/userConstants"


export const deleteUserReducer = (state={}, action) => {
    
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {loading : true}
    
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true}
        
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        

        default:
            return state
    }
}


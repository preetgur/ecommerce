import {
    USER_PROFILE_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_RESET,
    
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_SUCCESS
} from "../constants/userConstants";


const initialState = {

}
export const userProfileReducer = (state=initialState,action) =>{
    
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return { loading:true }
            
        case USER_PROFILE_SUCCESS:
            return { loading: false, user : action.payload }
    
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        
        case USER_PROFILE_RESET:
            return { user:{} }
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = initialState, action) => {

    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:   
            return { loading: true }

        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false,success:true, user: action.payload }

        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
            
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}


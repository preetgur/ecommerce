import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_PROFILE_REQUEST,
    USER_PROFILE_FAIL,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,


} from '../constants/userConstants'
import axios from 'axios'

export const userLogin = (email, password) => async (dispatch) => {
    try {
        
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const email_password = {
            "username": email,
            "password": password
        }

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post('api/users/login', email_password, config)

        console.log('user login data ..', data);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo',JSON.stringify(data)) 
    }
    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
        
    }
    
  
}

export const logout = () => async(dispatch) => {

    localStorage.removeItem('userInfo')
    localStorage.removeItem('shipping')
    dispatch({
        type : USER_LOGOUT
    })

    dispatch({
        type : USER_LIST_RESET
    })
    // dispatch({
    //     type : USER_PROFILE_RESET
    // })
}


export const userRegister = (email, password,name) => async (dispatch) => {
    try {

        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const email_password = {
            "email": email,
            "password": password,
            "name":name,
        }

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post('api/users/register', email_password, config)

        console.log('user register data ..', data);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })

    }


}


export const userProfile = (id) => async(dispatch,getState) =>{

    try {

        dispatch({
            type: USER_PROFILE_REQUEST
        })

        // get the user from state
        const {
            userLogin: { userInfo }
        } = getState()
    
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            } 
        }
        const { data } = await axios.get(`api/users/${id}`, config)
        // console.log('data.. ',data);
        

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload : data
        })

    }
    
    catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })

    }
    
}



export const userUpdateProfile = (email,name,password) => async(dispatch,getState) =>{

    try {

        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        // get the user from state
        const {
            userLogin: { userInfo }
        } = getState()
    
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            } 
        }

        console.log('authorization .. ',config);
        
        const details = {
            "name":name,
            "email": email,
            "password": password
        }

        console.log('details ..',details);
        

        const { data } = await axios.put("api/users/profile/update",details ,config)
        console.log('data.. ',data);
        

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload : data
        })

        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload : data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }
    
    catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })

    }
    
}


export const userList = () => async (dispatch, getState) => {

    try {

        dispatch({
            type: USER_LIST_REQUEST
        })

        // get the user from state
        // why use getstate() instead of useSelector : becasue useSelector in hook which should be used in components
        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }



        const { data } = await axios.get("/api/users/",config)
        console.log('data.. ', data);


        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    }

    catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })

    }

}
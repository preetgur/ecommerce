import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

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
    dispatch({
        type : USER_LOGOUT
    })
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
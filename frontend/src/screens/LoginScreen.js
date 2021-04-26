import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { userLogin } from '../actions/userActions'
import AlertMessage from '../components/AlertMessage'
import './LoginScreen.css'
import {Alert} from 'react-bootstrap'

function LoginScreen() {

    const history = useHistory()
    const location = useLocation()

    const redirect = location.search ? location.search.split("=")[1]:"/"
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const loginDetail = useSelector(state => state.userLogin)

  
    const { loading, error, userInfo } = loginDetail

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
        
    }, [history,userInfo,redirect])
  
    const userLoginHandler = (e) => {
        e.preventDefault();
        
        console.log("Sign IN ..", email, password)
        
        dispatch(userLogin(email, password))
        
    }
    return (
        <div className="loginScreen">

            <div className="loginScreen__container">

                {loading ? <h1>Loading ...</h1> : <> 


                    {error && 
                        <AlertMessage variant="danger">
                        {error}
                        </AlertMessage>   
                    }
                    <h1>Sign IN</h1>

            <form>


                <div className="loginScreen__email">
                        <label htmlFor="email"> <small>Email Address </small> </label>
                 <input type="email" placeholder="Enter Your Email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="loginScreen__password">
                    
                <label htmlFor="password">Password</label> 
                 <input type="password" placeholder="Enter Your Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <input type="submit" className="loginScreen__btn" value="sign in" onClick={userLoginHandler} />
            </form>

                <p>New Customer ? <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>Register </Link>  </p>
                
                </>}
            </div>

        </div>
    )
}

export default LoginScreen

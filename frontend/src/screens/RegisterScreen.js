import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { userRegister } from '../actions/userActions'
import './RegisterScreen.css'
function RegisterScreen() {

    const history = useHistory()
    const location = useLocation()

    const redirect = location.search ? location.search.split("=")[1] : "/"

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const dispatch = useDispatch()
    const registerDetail = useSelector(state => state.userRegister)


    const { loading, error, userInfo } = registerDetail
    console.log('register ..',registerDetail);
    

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const userRegisterHandler = (e) => {
        e.preventDefault();
        setMessage("")


        console.log("Sign UP ..", email, password, name)
        if (password !== confirmPassword) {
            setMessage("Passwords don't match !!!")
        }

        else {

        dispatch(userRegister(email, password,name))
        }

    }
    return (
        <div className="loginScreen">

            <div className="loginScreen__container">

                {loading ? <h1>Loading ...</h1> : <>

                    <h1>Register</h1>

                    {error && <h1 className="loginScreen__error">{error}</h1>}
                    {message && <h1 className="loginScreen__error">{message}</h1>}

                    <form>


                        <div className="loginScreen__email">
                            <label htmlFor="email"> <small>Email Address </small> </label>
                            <input type="email" placeholder="Enter Your Email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="loginScreen__email">
                            <label htmlFor="name"> <small>Name </small> </label>
                            <input type="text" placeholder="Enter Your name" value={name} onChange={e => setName(e.target.value)} />
                        </div>

                        <div className="loginScreen__password">

                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter Your Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <div className="loginScreen__password">

                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" placeholder="Enter Your Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </div>

                        <input type="submit" className="loginScreen__btn" value="sign up" onClick={userRegisterHandler} />
                    </form>

                    <p>Already Existing User ? <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>Sign In </Link>  </p>

                </>}
            </div>

        </div>
    )
}

export default RegisterScreen

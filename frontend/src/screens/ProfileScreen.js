import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { userProfile, userUpdateProfile} from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


function ProfileScreen() {

    const dispatch = useDispatch()
    const history = useHistory()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const userProf = useSelector(state => state.userProfile)
    const { loading, error, user } = userProf

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProf = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProf



    
    useEffect(() => {
        
        if (!userInfo) {
            history.push("/login")
        }

        else {
            if (!user || !user.username || success) {
                dispatch({
                    type : USER_UPDATE_PROFILE_RESET
                })
                dispatch((userProfile('profile')))
            }
            else {

                setEmail(user.email)
                setName(user.name)

            }
        }
    }, [dispatch, history, user,success])
    
    const profileUpdateHandler = (e) => {
        e.preventDefault();
        setMessage("")


        console.log("Profile Update ..", email)
        console.log("Profile Update p..", password)
        console.log("Profile Update n..", name)


        if (password !== confirmPassword) {
            setMessage("Passwords don't match !!!")
        }

        else {

            dispatch(userUpdateProfile(email,name ,password))
        }

    }

    return (
        <div className="loginScreen">

            <div className="loginScreen__container">

                {loading ? <h1>Loading ...</h1> : <>

                    <h1>Profile</h1>

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

                        <input type="submit" className="loginScreen__btn" value="update" onClick={profileUpdateHandler} />
                    </form>


                </>}
            </div>

        </div>
    )
}

export default ProfileScreen

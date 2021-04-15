import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { myOrder } from '../actions/orderActions'
import { userProfile, userUpdateProfile} from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import './ProfileScreen.css'

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

    const myOrd = useSelector(state => state.myOrder)
    const { loading:loadingOrder, error:errorOrder, order } = myOrd
    
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
                dispatch(myOrder())
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


        if (password !== confirmPassword) {
            setMessage("Passwords don't match !!!")
        }

        else {

            dispatch(userUpdateProfile(email,name ,password))
        }

    }

    return (
        <div className="profileScreen">

            <div className="profileScreen__container">

                <div className="profileScreen__First">


                {loading ? <h1>Loading ...</h1> : <>

                    <h1>Profile</h1>

                    {error && <h1 className="profileScreen__error">{error}</h1>}
                    {message && <h1 className="profileScreen__error">{message}</h1>}

                    <form className="profileScreen__form">


                        <div className="profileScreen__email">
                            <label htmlFor="email"> <small>Email Address </small> </label>
                            <input type="email" placeholder="Enter Your Email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="profileScreen__name">
                            <label htmlFor="name"> <small>Name </small> </label>
                            <input type="text" placeholder="Enter Your name" value={name} onChange={e => setName(e.target.value)} />
                        </div>

                        <div className="profileScreen__password">

                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter Your Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <div className="profileScreen__password">

                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" placeholder="Enter Your Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </div>

                        <input type="submit" className="profileScreen__updateBtn" value="update" onClick={profileUpdateHandler} />
                    </form>


                </>}
                </div>
                
                <div className="profileScreen__second">

                    
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>

                        </tr>
                      
                            {order?.map((item) => (
                                <tr>
                                    <td>{item._id}</td>
                                    <td>{item.createdAt.substring(0,10)}</td>
                                    <td>{item.totalPrice}</td>
                                    <td>{item.isPaid ? item.paidAt.substring(0, 10) : "Pending"}</td>
                                    <td>{item.isDelivered ? item.deliveredAt.substring(0, 10) : <Link to={`order/${item._id}`}> <input type="Button" value="Details" className="profileScreen__btn"/> </Link> }</td>



                                </tr>
                            ))
                            }
                            
                       
                      </table>  
                    

                    
                </div>
            </div>

        </div>
    )
}

export default ProfileScreen

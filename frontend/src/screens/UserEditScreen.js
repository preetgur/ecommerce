import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getUserAdmin, updateUserAdmin, userList, userRegister } from '../actions/userActions'
import { USER_UPDATE_ADMIN_RESET } from '../constants/userConstants'
import './RegisterScreen.css'

function UserEditScreen() {

    const history = useHistory()
    const params = useParams()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const [message, setMessage] = useState("")
    const userGetAdmin = useSelector(state => state.userGetAdmin)
    const { loading, error, user } = userGetAdmin

    const userUpdateAdmin = useSelector(state => state.userUpdateAdmin)
    const { users, success } = userUpdateAdmin
    console.log('userupdateadmin .. ',userUpdateAdmin);
    
    useEffect(() => {

        if (success) {
            dispatch({ type: USER_UPDATE_ADMIN_RESET })
            // dispatch(userList())
        
            history.push('/admin/userlist/')
            
        }

        else {
            if (!user || user.id !== Number(params.id) ) {

                dispatch(getUserAdmin(params.id))
            }
            else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)

            }

        }
       

    }, [params.id,user,history,success])

    const userUpdateHandler = (e) => {
        e.preventDefault();
        setMessage("")

        dispatch(updateUserAdmin({
            name,
            email,
            isAdmin,
            id : params.id
        }))
        
        dispatch(getUserAdmin(params.id))

  
        setMessage("User is Updated")

    }
    return (
        <div className="loginScreen">

            <div className="loginScreen__container">
                <Link to={"/admin/userlist"}>Go BACK </Link>

                {loading ? <h1>Loading ...</h1> : <>

                    <h1>User Details</h1>

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

                        <div className="loginScreen__checkbox">

                            <label htmlFor="password">Is Admin</label>
                            <input type="checkbox" placeholder="Enter Your Password" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
                        </div>

                        

                        <input type="submit" className="loginScreen__btn" value="UpdateUser" onClick={userUpdateHandler} />
                    </form>


                </>}
            </div>

        </div>
    )
}

export default UserEditScreen

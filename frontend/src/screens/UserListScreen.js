import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { deleteUser, userDelete, userList as userListAction} from '../actions/userActions'
import "./UserListScreen.css"

function UserListScreen() {

    const dispatch = useDispatch()
    const history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector(state => state.userList)
    const { loading, success, error, users } = userList


    const deleteUser = useSelector(state => state.deleteUser)
    const {success: successDelete,error:errorDelete} = deleteUser
    
    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {

            dispatch(userListAction())
        }
        else {
            history.push('/login')
        }

    }, [dispatch,successDelete])

    
    const deletehandler = (id) => {
        
        if (window.confirm(`Are You Sure You Want To Delete User With ${id} ?`))
        {
            dispatch(userDelete(id))

        }
    }

    return (
        <div className="userListScreen">
            <h1>User List</h1>


            <div className="userListScreen__First"> 
                {errorDelete && <p>{ errorDelete}</p>}
                {loading ? "loading userlist.." :
                    error ? <p>{error}</p> :
                        (
                            
                    
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Action</th>

                </tr>

                {users?.map((user) => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>

                        <td>{user.isAdmin ?
                            <i className="fas fa-check" style={{ color: "green" }}></i> : <i className="fas fa-check" style={{ color: "red" }}></i>}</td>

                        <td>{
                            <Link to={`/admin/user/${user._id}`}>
                                <i className="fas fa-edit" style={{ color: "green" }}></i>
                            </Link>}
                        
                            <button onClick={()=>deletehandler(user._id)} ><i className="fas fa-trash" style={{ }}></i></button>
                        </td>



                    </tr>
                ))
                }


                            </table>
                        )
                }
            </div>
        </div>
    )
}

export default UserListScreen

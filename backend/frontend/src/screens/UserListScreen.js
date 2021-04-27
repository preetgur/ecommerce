import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { deleteUser, userDelete, userList as userListAction} from '../actions/userActions'
import "./UserListScreen.css"
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Alert } from 'react-bootstrap'
import Loading from '../components/Loading'
import AlertMessage from '../components/AlertMessage'


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
            <h3>Users</h3>
            {loading
                ? (<Loading message="user list"/>)
                : error
                    ? (<AlertMessage variant='danger'>{error}</AlertMessage>)
                    : (
                        
                        <Table striped bordered hover  className='table-sm' responsive="sm"  size="sm" >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th>Active</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users?.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className='fas fa-check' style={{ color: 'red' }}></i>
                                        )}</td>

                                        <td>{user.isActive ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className='fas fa-check' style={{ color: 'red' }}></i>
                                        )}</td>

                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deletehandler(user._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default UserListScreen

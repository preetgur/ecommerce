import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { orderListAdmin } from '../actions/orderActions'
import { deleteProduct, listProduct } from '../actions/productActions'
import { deleteUser, userDelete, userList as userListAction } from '../actions/userActions'

import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import "./UserListScreen.css"
import Loading from '../components/Loading'

function OrderListScreen() {

    const dispatch = useDispatch()
    const history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders,success } = orderList


    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {

            dispatch(orderListAdmin())
        }
        else {
            history.push('/login')
        }

    }, [dispatch])


    return (
        <div className="userListScreen">
       

            <div className="userListScreen__First">
                {loading ? <Loading message="order list" /> :
                    error ? <p>{error}</p> :
                        (<>
                            <h3 className="text-center">Order List</h3>

                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                  
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>

                                </tr>
                                </thead>

                                <tbody>

                              
                                {orders?.map((order) => (
                                    <tr key={order._id}>
                                        
                                        <td>{order._id}</td>
                                        <td>{order.user.username}</td>
                                        <td>{order.createdAt.substring(0,10)}</td>

                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid ? <i class="far fa-check-circle text-center text-success"></i>: "Not Paid"}</td>

                                        <td>{order.isDelivered ? <i class="far fa-check-circle m-auto text-success"></i>: "pending"}</td>

                                        <td>{
                                            <Link to={`/order/${order._id}`}>
                                                Details
                                            </Link>}
                                        </td>

                                    </tr>
                                ))
                                }

                                </tbody>
                            </Table>
                        </>)    
                        
                }
            </div>
        </div>
    )
}

export default OrderListScreen

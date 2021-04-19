import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { orderListAdmin } from '../actions/orderActions'
import { deleteProduct, listProduct } from '../actions/productActions'
import { deleteUser, userDelete, userList as userListAction } from '../actions/userActions'
import "./UserListScreen.css"

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
            <h1>Order List</h1>
       
\
            <div className="userListScreen__First">
                {loading ? "loading Product list.." :
                    error ? <p>{error}</p> :
                        (
                            <table>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>

                                </tr>

                                {orders?.map((order) => (
                                    <tr key={order._id}>
                                        
                                        <td>{order._id}</td>
                                        <td>{order.user.username}</td>
                                        <td>{order.createdAt.substring(0,10)}</td>

                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid?order.paidAt.substring(0,10) : "Not Paid"}</td>

                                         <td>{order.isDelivered?order.deliveredAt.substring(0,10) : "pending"}</td>

                                        <td>{
                                            <Link to={`/order/${order._id}`}>
                                                Details
                                            </Link>}


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

export default OrderListScreen

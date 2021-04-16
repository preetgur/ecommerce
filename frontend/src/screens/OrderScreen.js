import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getOrderDetails, payOrder} from '../actions/orderActions'
import './PlaceOrderScreen.css'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/orderConstansts'


function OrderScreen() {

    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()  
    const params = useParams()
    

    const orderDetail = useSelector(state => state.orderDetail)
    const { loading, error, order } = orderDetail

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay // rename values

    const clientId = "AdJSZgvvBipiFPMFrFIfkRlUGAE4AFJ6rvZkjnQEUih7CHKAI2JKzKt3oouM79m8oh9Fd-td4sMonjoS"

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }

        document.body.appendChild(script)
    }


    useEffect(() => {
       
        if (!order  || order._id !== params.id) {

            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(params.id))
        }
        else if (!order?.isPaid) {
            
            if (!window.paypal) {
                addPayPalScript()
            }
            else
            {
                setSdkReady(true)
                }
        }

    }, [params.id,successPay])


    const successPaymentHandler = (paymentResult) => {
        console.log('payment result ..',paymentResult);
        
        dispatch(payOrder(params.id,paymentResult))
    }
    if (!loading && !error && order) {

        // it remains for this page only. No reflection to our store
        order.itemsPrice = order?.order.reduce((acc, item) => acc += Number(item.price * item.qty), 0).toFixed(2)
    }

    return loading ? <h1>Loading home... </h1> :
        error ? <h4>error</h4> :
    
    (
        <div className="placeOrderScreen">

            <div className="placeOrderScreen__container">

            
                <div className="placeOrderScreen__First">

                    <div className="placeOrderScreen__shipping">
                                <h5>Your Order No : {order?._id }</h5>
                        
                        <h1>Shipping</h1>
                                <p>Name : {order?.user?.name}</p>
                                <p>Email : <a href={`mailto:${order?.user?.email}`}>{order?.user.email}</a> </p>
                        shipping :
                                {order?.shippingAddress.address},
                                {order?.shippingAddress.city}
                                {order?.shippingAddress.postalCode},
                                {order?.shippingAddress.country}

                                { order?.shippingAddress.landmark && "( landmark : " + order?.shippingAddress.landmark + " )"}

                                <p> Status : {order?.isDelivered ? `Delivered on ${order.deliveredAt}` : "Pending"} </p>

                    </div>

                    <div className="placeOrderScreen__paymentMethod">
                        <h1>Payment Method</h1>
                    Method :  {order?.paymentMethod}

                    <p> Status : {order?.isPaid ? `Paid on ${order.paidAt}` : "Pending"} </p>
                    </div>

                    <div className="placeOrderScreen__cart">
                        <h1>Order Items</h1>

                        {
                            order?.order.map(item => {
                                return <div key={item._id} className="placeOrderScreen__cart__items">
                                
                            
                                <img src={item.image} alt={item.name} width="100px" className="placeOrderScreen__cart__items__image" />

                                <Link to={`/product/${item.product}`} className="placeOrderScreen__cart__items__name"> {item.name}</Link>

                                <p className="placeOrderScreen__cart__items__qty">
                                    {item.qty}  X {item.price}  =  {(item.qty * item.price).toFixed(2)}
                                </p>


                            </div>
                          })
                        }
                    
                    </div>

                </div>

                <div className="placeOrderScreen__second">
                    {error && <p className="placeOrderScreen__error">{error}</p>}

                    <h1>Order Summary</h1>

                    <div>
                        <p>item</p>
                        <p> ${order?.itemsPrice}</p>
                    </div>

                    <div>
                        <p>shipping Price</p>
                        <p> ${order?.shippingPrice}</p>
                    </div>

                    <div>
                        <p>tax</p>
                        <p> ${order?.taxPrice}</p>
                    </div>

                    <div>
                        <p>Total</p>
                        <p> ${order?.totalPrice}</p>
                    </div>

                    <div>
                                {!order?.isPaid &&
                                    (<div>
                                    
                                    {loadingPay && <p>loading pay..</p>}
                                    
                                    {!sdkReady ?
                                        <p>loading sdk ... {addPayPalScript()}</p>:
                                        <PayPalButton amount={order?.totalPrice}
                                            onSuccess={ successPaymentHandler}/>
                                        }


                                    </div>)
                        }    
                    </div> 

                </div>

            </div>
        </div>
    )
}

export default OrderScreen

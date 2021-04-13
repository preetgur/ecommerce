import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { orderActions } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import './PlaceOrderScreen.css'


function PlaceOrderScreen() {

    const dispatch = useDispatch()
    const history = useHistory()

    const orders = useSelector(state => state.order)
    
    const {loading,error,success,order} = orders

    const shippingAddress = useSelector(state => state.shippingAddress)
    const { shipping } = shippingAddress
    
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const paymentMethod = useSelector(state => state.paymentMethod)

    // it remains for this page only. No reflection to our store
    cart.itemsPrice = cartItems.reduce((acc, item) => acc += Number(item.price*item.qty ), 0).toFixed(2)
    
    cart.shippingPrice = Number((cart.itemsPrice > 500 ? 0 : 49).toFixed(2))

    cart.tax = Number( (.89 * cart.itemsPrice)/100 ).toFixed(2)
    
    cart.total = (Number(cart.itemsPrice )+ Number( cart.tax) + Number(cart.shippingPrice)).toFixed(2)
    

    const placeOrderHandler = () => {

        dispatch(orderActions({
            orderItems: cartItems,
            shippingAddress: shipping,
            paymentMethod :paymentMethod.method,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.tax,
            shippingPrice: cart.shippingPrice,
            totalPrice : cart.total
        }))
    }

    if (!paymentMethod.method) {
        history.push('/payment')
    }

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }

    }, [success,history])
    return (
        <div className="placeOrderScreen">
            
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="placeOrderScreen__container">

           

            <div className="placeOrderScreen__First">

                    <div className="placeOrderScreen__shipping">
                      
                    <h1>Shipping</h1>
                    shipping : {shipping.address}, {shipping.city} {shipping.postalCode},{shipping.country} {"( landmark : " + shipping.landmark + " )"}
                </div>

                <div className="placeOrderScreen__paymentMethod">
                    <h1>Payment Method</h1>
                    Method :  {paymentMethod.method}
                </div>

                    <div className="placeOrderScreen__cart">
                        <h1>Order Items</h1>

                    {cartItems.map(item => {
                        return <div className="placeOrderScreen__cart__items">
                            <img src={item.image} alt={item.name} width="100px" className="placeOrderScreen__cart__items__image" />

                            <Link to={`/product/${item.product}`} className="placeOrderScreen__cart__items__name"> {item.name}</Link>

                            <p className="placeOrderScreen__cart__items__qty">
                                {item.qty}  X {item.price}  =  {(item.qty * item.price).toFixed(2)}
                            </p>
                            
                           
                        </div>
                    })}
                </div>

            </div>

                <div className="placeOrderScreen__second">
                    {error && <p className="placeOrderScreen__error">{error}</p>}

                    <h1>Order Summary</h1>

                    <div>
                        <p>item</p>
                        <p> ${cart.itemsPrice}</p>
                    </div>

                    <div>
                        <p>shipping Price</p>
                        <p> ${cart.shippingPrice}</p>
                    </div>

                    <div>
                        <p>tax</p>
                        <p> ${cart.tax}</p>
                    </div>

                    <div>
                        <p>Total</p>
                        <p> ${cart.total}</p>
                    </div>

                    <input type="button" Value="Place Order" className="PlaceOrderScreen__btn" onClick={placeOrderHandler}/>
            </div>
                
            </div>
        </div>
    )
}

export default PlaceOrderScreen

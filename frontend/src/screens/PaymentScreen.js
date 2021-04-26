import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import './PaymentScreen.css'


function PaymentScreen() {

    const history = useHistory()
    const dispatch = useDispatch()
    const shippingAddress = useSelector(state => state.shippingAddress)
    const {shipping}    = shippingAddress
    console.log('shipping adr ..',shippingAddress);
    const [paymentMethod, setPaymentMethod] = useState("PayPal")
    console.log('payment method .. ',paymentMethod);
    

    useEffect(() => {
        if (!shipping.address)
        {
            history.push("/shipping")
            }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod))
        history.push("/palceOrder")
    }

    return (
        <div className="paymentScreen">
            <CheckoutSteps step1 step2 step3 />

            
            <h3>Select Payment Method </h3>
            <Alert variant="danger" className="text-center"> Currenty Paypal Payment Method is Working.</Alert>
            <form onSubmit={submitHandler}>

                <div className="paymentScreen__input"> 
                    <input type="radio" name="payment" value="PayPal"  onChange={e => setPaymentMethod(e.target.value)} defaultChecked/>  PayPal
               </div>
                
                <div className="paymentScreen__input">

                    <input type="radio" name="payment" value="Stripe" onChange={e => setPaymentMethod(e.target.value)} disabled/> Stripe
                    </div>
                
                <div className="paymentScreen__input">

                    <input type="radio" name="payment" value="Paytm" onChange={e => setPaymentMethod(e.target.value)} disabled /> Paytm
                    </div>
                
                <input type="submit" value = "Proceed" className="paymentScreen__btn"/>

            </form>
        </div>
    )
}

export default PaymentScreen

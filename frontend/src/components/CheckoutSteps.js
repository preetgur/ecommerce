import React from 'react'
import { Link } from 'react-router-dom'

function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <div className="checkoutSteps">
            
            { step1 ? <Link to="/login"> Login</Link> : <button disabled>Login</button>} 
            
            { step2 ? <Link to="/shipping">Shipping</Link> : <button disabled>Shipping</button>}

            { step3 ? <Link to="/payment">Payment</Link> : <button disabled>Payment</button>}

            { step4 ? <Link to="/orderPlaced">Order Placed</Link> : <button disabled>Order Placed</button>}


        </div>
    )
}

export default CheckoutSteps

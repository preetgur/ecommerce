import React from 'react'
import { Link } from 'react-router-dom'
import './CheckoutSteps.css'

function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <div className="checkoutSteps">
            {console.log('steps in chekout',step1,step2)
            }
            { step1 ? <Link to="/login" className="checkoutSteps__link"> Login</Link> : <button disabled className="checkoutSteps__disabled">Login</button>} 
            
            { step2 ? <Link to="/shipping" className="checkoutSteps__link" >Shipping</Link> : <button disabled className="checkoutSteps__disabled">Shipping</button>}

            { step3 ? <Link to="/payment" className="checkoutSteps__link" >Payment</Link> : <button disabled className="checkoutSteps__disabled">Payment</button>}

            { step4 ? <Link to="/orderPlaced" className="checkoutSteps__link">Order Placed</Link> : <button disabled className="checkoutSteps__disabled">Order Placed</button>}


        </div>
    )
}

export default CheckoutSteps

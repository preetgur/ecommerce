import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import './ShippingScreen.css'

function ShippingScreen() {

    const ship = JSON.parse(localStorage.getItem('shipping') )|| ""
    const [address, setAddress] = useState(ship.address)
    const [city, setCity] = useState(ship.city)
    const [postalCode, setPostalCode] = useState(ship.postalCode)
    const [country, setCountry] = useState(ship.country)
    const [landmark, setLandmark] = useState(ship.landmark)

    const dispatch = useDispatch()
    const history = useHistory()
    const shippingAddr = useSelector(state => state.shippingAddress)

    console.log('shipping add .. ',shippingAddr);
    
    

    const shippingHandler = (e) => {

        e.preventDefault();
        console.log('shipping');
        const data = {
            address,
            city,
            postalCode,
            country,
            landmark
        }
        dispatch(saveShippingAddress(data))
        // localStorage.setItem('shipping',JSON.stringify(data)) 
        
        history.push("/payment")
        
    }

    return (
        <div className="shipping">
            <CheckoutSteps step1 step2/>
         
            <h1>Shipping Address</h1>

            <div className="shipping__container">

                <form className="shipping__form">

                    <input type="text" placeholder="Enter Address" value={address} onChange={ e => setAddress(e.target.value)}/>
                    <input type="text" placeholder="Enter City" value={city} onChange={e => setCity(e.target.value)}/>
                    <input type="text" placeholder="Enter Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)}/>
                    <input type="text" placeholder="Enter Nearer Landmark" value={landmark} onChange={e => setLandmark(e.target.value)} />
                    <input type="text" placeholder="Enter Country" value={country} onChange={e => setCountry(e.target.value)} />

                    <input type="submit" className="shipping__btn" value="Continue" onClick={shippingHandler }/>

                </form>


            </div>
        </div>
    )
}

export default ShippingScreen

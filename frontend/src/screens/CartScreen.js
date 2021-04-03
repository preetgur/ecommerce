import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import { addToCart } from '../actions/cartActions'

function CartScreen() {

    const params = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log("cart items .. ",cartItems)

    const productId = params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    useEffect(() => {

        if (productId) {
            dispatch(addToCart(productId, qty))

        }
    }, [dispatch,productId,qty])

    return (


        <div>
            <h1>This is cart screen</h1>
            {qty}
        </div>
    )
}

export default CartScreen

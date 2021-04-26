import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import './CartScreen.css'

function CartScreen() {

    const params = useParams()
    const history = useHistory()
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
    }, [dispatch, productId, qty])
    
    const removeFromCartHandler = (id) =>
    {
      
        dispatch(removeFromCart(id))

    }
   
    const checkoutHandler = () => {
        

        history.push('/login?redirect=shipping')
        
    }

    return (
        

        <div className="cartScreen">

            <div className="cartScreen__container">

            <div className="cartScreen__one">
                    <h3>Cart</h3>

                {cartItems.length === 0 ?
                    <p>Your Cart Is Empty <Link to="/">Go Back</Link> </p> :
                        <div className="cartScreen__itemDetails">
                    {cartItems.map(item => (<div className="cartScreen__items" key={item.product}>
                        
                        
                            <img src={item.image} alt="No imag" className="cartScreen__image" />

                            
                            <Link className="cartScreen__name" to={`/product/${item.product}`}>{item.name}</Link>
                            
                            
                        <p className="cartScreen__price">{item.price} <i class="fas fa-rupee-sign"></i>
                        </p>

                            <select className="cartScreen__qty" value={item.qty} onChange={(e) => dispatch(addToCart(item.product,e.target.value))}>
                                {[...Array(item.countInStock).keys()].map(x => (
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                ))}
                            </select>

                            <button className="cartScreen__removeBtn" onClick={() => removeFromCartHandler(item.product)}>  <i className="fas fa-trash"></i></button>
                          

                        

                        </div>))}
                    </div>
                }
            </div>

            <div className="cartScreen__two">

                    <h3>SubTotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) Items</h3>
                    
                    <p className="cartScreen__two__price">
                        
                        {cartItems.reduce((acc, item) => acc + Number(item.qty) * item.price, 0).toFixed(2)}  <i class="fas fa-rupee-sign"></i>
                        
                    </p>

                    
                    {cartItems.length > 0 ?
                        <button className="cartScreen__proceedToCheckout" onClick={checkoutHandler}>
                            Proceed To Checkout
                    </button> :
                        <button className="cartScreen__proceedToCheckout btn_disabled" disabled>
                            Proceed To Checkout
                    </button>
                    }
                    
                    
                   
            </div>
        </div>

        </div>
    )
}

export default CartScreen

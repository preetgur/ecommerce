import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import './ProductScreen.css'

import { detailProduct } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'


function ProductScreen() {
    

    const params = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const productDetail = useSelector(state => state.productDetail)
    // productDetail used from store.js
    const { product, loading, error } = productDetail
    const [qty, setQty] = useState(1)

    useEffect(() => {

        dispatch(detailProduct(params.id))
    }, [dispatch,params])

    const addToCartHandler = () => {
        console.log('add to cart ... ', params.id, qty);
        // redirect to cart page
        history.push(`/cart/${product._id}?qty=${qty}`)
        
    }

    return (
        <div className="productScreen">

            <Link to="/" className="productScreen__goBack">Go Back</Link>

            {loading ? <h2>Loading ... </h2>
                : error ? <h3>{error}</h3>
                :
                   ( <div className="productScreen__container">

                        <img src={product.image} alt="" className="productScreen__image" />

                        <div className="productScreen__container__details">

                            <h1 className="productScreen__name padding">{product.name}</h1>
                            {/* <hr/> */}

                            <Rating className="productScreen__rating padding" value={product.rating} no_of_reviews={` ${product.numReviews} reviews`} />
                            <p className="productScrren__price padding"> <span>Price :</span> {product.price}</p>
                            <p className="productScreen__description ">Description : {product.description}</p>
                        </div>

                        <div className="productScreen__row3">
                            <div className="productScreen__row3__price">Price :{product.price}</div>
                            <div className="productScreen__row3__status">status :{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</div>

                            {product.countInStock > 0 &&
                                <div className="productScreen__row3__qty">
                                <div className="productScreen__row3__qty__1">Quantity</div>
                                <div className="productScreen__row3__qty__2">
                                    <select onChange={(e)=>setQty(e.target.value)}> 
                                    {[...Array(product.countInStock).keys()].map(x => (
                                    <option key={x+1} value={x+1}>{x + 1}</option>
                                    ))}
                                    </select>
                            
                                </div>
                                </div>

                                }

                            <button className="productScreen__btn" disabled={product.countInStock === 0} onClick={addToCartHandler} >{product.countInStock > 0 ? "Add To Cart" : "Out Of Stock"}</button>

                        </div>
                    </div>)

                 }

            


        </div>
    )
}

export default ProductScreen

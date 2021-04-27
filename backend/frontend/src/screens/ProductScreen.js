import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import AlertMessage from '../components/AlertMessage'

import './ProductScreen.css'

import { detailProduct, reviewProduct } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


function ProductScreen() {
    

    const params = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const productDetail = useSelector(state => state.productDetail) 
    // productDetail used from store.js
    const { product, loading, error } = productDetail

    const reviewReducer = useSelector(state => state.reviewReducer)
    const { loading: loadingReview, success: successReview, error: errroReview } = reviewReducer
    

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [qty, setQty] = useState(1)
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)

    useEffect(() => {

        

        if (successReview) {

            setRating(0)
            setComment("")
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(detailProduct(params.id))
    }, [dispatch, params, successReview])

    const addToCartHandler = () => {
        console.log('add to cart ... ', params.id, qty);
        // redirect to cart page
        history.push(`/cart/${product._id}?qty=${qty}`)
        
    }

    const createReviewHandler = () => {
        console.log('create review handler .. ');

        dispatch(reviewProduct(params.id,{rating,comment}))
  
    }

    return (
        <div className="productScreen">

            <Link to="/" className="productScreen__goBack">Go Back</Link>

            {loading ? <h2>Loading ... </h2>
                : error ? <h3>{error}</h3>
                :
                   ( <> <div className="productScreen__container">

                        <img src={product.image} alt="" className="productScreen__image" />

                        <div className="productScreen__container__details">

                            <h1 className="productScreen__name padding">{product.name}</h1>
                            {/* <hr/> */}

                            <Rating className="productScreen__rating padding" value={product.rating} no_of_reviews={` ${product.numReviews} reviews`} />
                            <p className="productScrren__price padding">
                                <span>Price :</span>
                                <p>
                                {product.price} <i class="fas fa-rupee-sign"></i>
                                </p>
                            </p>
                            <p className="productScreen__description ">Description : {product.description}</p>
                        </div>

                        <div className="productScreen__row3">
                            
                            <div className="productScreen__row3__status">
                                status : <p> {product.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>
                            </div>

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
                    </div>
                    
                        <div className="productScreen__review">
                            <div className="productScreen__review__first">

                                <h3>Reviews</h3>
                                {product.reviews.length == 0 && <p>No Review Yet. Be The First One.</p>}

                            {product.reviews.map(review => (
                                <div className="productScreen__review__detail" key={review._id}> 
                                    <strong>By : {review.name ? review.name : "Anonymous"}</strong>
                                    
                                    <p>{review.comment}</p>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0,10)}</p>


                                </div>
                            ))}
                            </div>

                            <div className="productScreen__review__second">

                            {userInfo?.username && (<div className="productScreen__write__review">
                                    <h3>Write a Review</h3>
                                    
                                    <p>  {errroReview &&
                                        <AlertMessage variant="danger">
                                            {errroReview}
                                        </AlertMessage>}    
                                    </p>
                                    
                                    <p> {loadingReview && "loading Review .."} </p>


                           Rating : <select value={rating} onChange={(e) => setRating(e.target.value)}>
                                <option value="0">Select ...</option>
                                <option value={1}>1 - Poor</option>
                                <option value="2">2 - Fair</option>
                                <option value="3">3 - Satisfied</option>
                                <option value="4">4 - Good</option>
                                <option value="5">5 - Excellent</option>

                            </select>

                           comment : <textarea rows="4" cols="8" value={comment} onChange={ e => setComment(e.target.value)}></textarea>
                            
                            <input className="reviewsubmit_btn" type="submit" onClick={createReviewHandler} />
                            
                         </div>    )}
                            </div>
                        </div>

                    </>)

                 }

            


        </div>
    )
}

export default ProductScreen

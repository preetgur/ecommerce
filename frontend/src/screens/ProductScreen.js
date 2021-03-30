import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../products'
import './ProductScreen.css'

function ProductScreen() {
    

    const params = useParams()
    // const product = products.find( val => val._id === params.id)

    const [product, setProduct] = useState([])

    useEffect(() => {

        async function fetchProduct() {

            const { data } = await axios.get(`/getProduct/${params.id}`)
            setProduct(data)

        }
        fetchProduct()

    }, [])


    return (
        <div className="productScreen">

            <Link to="/" className="productScreen__goBack">Go Back</Link>

            <div className="productScreen__container">

                <img src={product.image} alt="" className="productScreen__image" />
                
                <div className="productScreen__container__details">

                    <h1 className="productScreen__name padding">{product.name}</h1>
                    {/* <hr/> */}
                    
                    <Rating className="productScreen__rating padding" value={product.rating} no_of_reviews={` ${product.numReviews} reviews` } />
                    <p className="productScrren__price padding"> <span>Price :</span> { product.price}</p>
                    <p className="productScreen__description ">Description : {product.description }</p>
                </div>

                <div className="productScreen__row3">
                    <div className="productScreen__row3__price">Price :{product.price}</div>
                    <div className="productScreen__row3__status">status :{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</div>
                    <button className="productScreen__btn" disabled={product.countInStock === 0} >{ product.countInStock>0 ? "Buy Now":"Out Of Stock"}</button>

                </div>
                
            </div>
           


        </div>
    )
}

export default ProductScreen

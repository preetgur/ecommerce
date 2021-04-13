// import React from 'react' 
import './Product.css'
import Rating from './Rating'
import { Link } from 'react-router-dom'


function Product({product}) {
    return (
        <div className="product">
          
            <p className="product__name"> {product.name}</p>
            
            <Link to={`product/${product._id}`}>
                <img className="product__img" src={product.image} alt="no image" />

            </Link>
            
           <small className="product__price">{product.price} $ </small>
            {/* <p>{product.rating} from {product.numReviews} reviews</p> */}
            <Rating value={product.rating} no_of_reviews={` ${product.numReviews} reviews `} />
            
        </div>
    )
}

export default Product

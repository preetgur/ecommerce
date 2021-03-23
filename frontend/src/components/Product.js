import React from 'react'
import './Product.css'
function Product({product}) {
    return (
        <div className="product">
          
           <p className="product__name"> {product.name}</p> 
           <img  className="product__img" src={product.image} alt="no image"/>
           <small className="product__price">{product.price} $ </small>
           <p>{product.rating} from {product.numReviews} reviews</p>
            {console.log('id.. g',product)
            }
        </div>
    )
}

export default Product

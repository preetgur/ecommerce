import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { topProductAction } from '../actions/productActions'

import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./ProductCarousel.css"

function ProductCarousel() {

    const dispatch = useDispatch()
    const topProduct = useSelector(state => state.topProduct)

    const { loading, error, products } = topProduct
    
    useEffect(() => {

        dispatch(topProductAction())
    }, [dispatch])
    
    return (loading ? "loading carousel .." :
        error ? <p>{error}</p> :<>
            
      <Carousel pause='hover' className='bg-dark slider'>
                    {products?.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid className="sliderImage"/>
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{product.name} (${product.price})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>

        </>
    )
}

export default ProductCarousel

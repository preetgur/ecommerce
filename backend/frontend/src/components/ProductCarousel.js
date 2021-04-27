import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { topProductAction } from '../actions/productActions'

import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./ProductCarousel.css"
import Loading from './Loading'
import AlertMessage from './AlertMessage'

function ProductCarousel() {

    const dispatch = useDispatch()
    const topProduct = useSelector(state => state.topProduct)

    const { loading, error, products } = topProduct
    
    useEffect(() => {

        dispatch(topProductAction())
    }, [dispatch])
    
    return (loading ?""
        : error
            ? <AlertMessage variant='danger'>{error}</AlertMessage>
            : (
                <Carousel pause='hover' className='bg-dark slider'>
                    {products?.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid  className="sliderImage"/>
                                <Carousel.Caption className='carousel.caption text-light '>
                                    <h4 className="carousel__caption">{product.name} {product.price} <i class="fas fa-rupee-sign"></i>
                                    </h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

export default ProductCarousel

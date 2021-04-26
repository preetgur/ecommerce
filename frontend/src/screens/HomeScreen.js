import React, { useEffect, useState } from 'react'
// import productList from '../products'   
import Product from '../components/Product'
import './HomeScreen.css'
import axios from "axios"
import { listProduct } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

import { Button,Spinner} from 'react-bootstrap'
import Loading from '../components/Loading'

function HomeScreen() {

    // const [products, setProducts] = useState([])
     
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {products,loading,error,page,pages } =  productList
    //productList is reducer
    const location = useLocation()
    console.log('loaction ... ',location);
    const keyword = location.search
    
    useEffect(() => {
        
        console.log('Dis ..',keyword); // get the location search 
        dispatch(listProduct(keyword))
     
    }, [dispatch,keyword])

    return (
        <div className="homeScreen">
            {!keyword && <ProductCarousel />}

            
            
            {loading ? <Loading message="Products"/> : error ? <h1>{error}</h1>
                :
                <>
                    <h1>Latest Products</h1>


                        <div className="homeScreen__latestProducts">

                            {products.map(product => (

                                <Product key={product._id} product={product} />

                            ))}
                    </div>

                    <Paginate page={page} pages={pages} keyword={keyword} />

                    </>
            }


        </div>
    )
}

export default HomeScreen

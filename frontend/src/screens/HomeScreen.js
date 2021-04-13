import React, { useEffect, useState } from 'react'
// import productList from '../products'   
import Product from '../components/Product'
import './HomeScreen.css'
import axios from "axios"
import { listProduct } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'


function HomeScreen() {

    // const [products, setProducts] = useState([])
     
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {products,loading,error } =  productList
    //productList is reducer

    useEffect(() => {
     
        dispatch(listProduct)
     
    }, [dispatch])

    return (
        <div className="homeScreen">
            <h1>Latest Products</h1>
            
            {loading ? <h1>Loading ...</h1> : error ? <h1>{error}</h1>
                        :
                        <div className="homeScreen__latestProducts">

                            {products.map(product => (

                                <Product key={product._id} product={product} />

                            ))}
                        </div>
            }
           

        </div>
    )
}

export default HomeScreen

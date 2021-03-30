import React, { useEffect, useState } from 'react'
// import productList from '../products'   
import Product from '../components/Product'
import './HomeScreen.css'
import axios from "axios"

function HomeScreen() {

    const [products, setProducts] = useState([])

    useEffect(() => {
            
        async function fetchProduct() {
            
           const {data} = await axios.get('/getProducts/')
            setProducts(data)
           
        }
        fetchProduct()

    }, [])

    return (
        <div className="homeScreen">
            <h1>Latest Products</h1>
            <div className="homeScreen__latestProducts">

                {products.map( product => ( 
                        
                        <Product key={product._id} product={product}/>
                     
                     ))}
                    </div>

        </div>
    )
}

export default HomeScreen

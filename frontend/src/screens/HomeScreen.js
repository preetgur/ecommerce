import React from 'react'
import productList from '../products'   
import Product from '../components/Product'
import './HomeScreen.css'

function HomeScreen() {
    return (
        <div className="homeScreen">
            <h1>Latest Products</h1>
            <div className="homeScreen__latestProducts">

                {productList.map( product => ( 
                        
                        <Product key={product._id} product={product}/>
                     
                     ))}
                    </div>

        </div>
    )
}

export default HomeScreen

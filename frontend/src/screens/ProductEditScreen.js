import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { detailProduct, updateProduct } from '../actions/productActions'
import { getUserAdmin, updateUserAdmin, userList, userRegister } from '../actions/userActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import './RegisterScreen.css'

function ProductEditScreen() {

    const history = useHistory()
    const params = useParams()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    
    const [countInStock, setCountInStock] = useState(0)
    const [description , setDescription] = useState("")

    const [image , setImage] = useState("")
    const [uploading, setUploading] = useState(false)


    const [message, setMessage] = useState("")

    const productDetail = useSelector(state => state.productDetail)
    const { loading, error, product } = productDetail

    const updateProd = useSelector(state => state.updateProduct)
    const { loading:loadingUpdate ,product:productUpdate, success, error:errorUpdate } = updateProd
    console.log('updateProduct .. ', updateProd);

    useEffect(() => {

        if (success) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch(detailProduct(params.id))
            history.push('/admin/productlist/')
        }

        else {
            if (!product || product._id !== Number(params.id || success)) {
                dispatch(detailProduct(params.id))
            }
            else {
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setCategory(product.category)

                setCountInStock(product.countInStock)
                setDescription(product.description)
                setImage(product.image)

            }
        }
    }, [params.id, history,dispatch,product._id,success])

    const productUpdateHandler = (e) => {
        e.preventDefault();
        setMessage("")

        dispatch(updateProduct({
            name,
            price,
            brand,
            category,
            id: params.id,
            countInStock,
            description
        }))

        // dispatch(getUserAdmin(params.id))


        // setMessage("Product is Updated")

    }

    const uploadFileHandler = async(e) => {
        
        console.log('Image uploaded', e.target.files[0])
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id',params.id)

        setUploading(true)

        console.log('form data .. ',formData);
        
        try {
            
            const config = {
                headers: {
                    
                'Content-Type' :'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)
            
            console.log('setimage data ..',data);
            
            setUploading(true)
            setImage(data)

        } catch (error) {
            
            setUploading(false) 
        }
    }
    return (
        <div className="loginScreen">

            <div className="loginScreen__container">
                <Link to={"/admin/productlist"}>Go BACK </Link>

                {loading ? <h1>Loading ...</h1> : <>

                    <h1>Product Details</h1>

                    {error && <h1 className="loginScreen__error">{error}</h1>}
                    {errorUpdate && <h1 className="loginScreen__error">{errorUpdate}</h1>}

                    {message && <h1 className="loginScreen__error">{message}</h1>}

                    <form>


                       
                        <div className="loginScreen__email">
                            <label htmlFor="name"> <small>Name </small> </label>
                            <input type="text" placeholder="Enter Your name" value={name} onChange={e => setName(e.target.value)} />
                        </div>

                        <div className="loginScreen__email">
                            <label htmlFor="email"> <small>Category </small> </label>
                            <input type="email" placeholder="Enter Your Email" value={category} onChange={e => setCategory(e.target.value)} />
                        </div>

                        <div className="loginScreen__email">
                            <label htmlFor="email"> <small>Brand </small> </label>
                            <input type="email" placeholder="Enter Your Email" value={brand} onChange={e => setBrand(e.target.value)} />
                        </div>

                        <div className="loginScreen__email">
                            <label htmlFor="name"> <small>Price </small> </label>
                            <input type="text" placeholder="Enter Your name" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                        
                        <div className="loginScreen__email">
                            <label htmlFor="name"> <small>Stock </small> </label>
                            <input type="text" placeholder="Enter Stock" value={countInStock} onChange={e => setCountInStock(e.target.value)} />
                        </div>

                        <div className="loginScreen__email">
                            <label htmlFor="name"> <small>Description </small> </label>
                            <input type="text" placeholder="Enter Description" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>

                        
                        <div className="loginScreen__email">
                            <label htmlFor="name"> <small>Image </small> </label>
                            <input type="text" placeholder="Image path" value={image} onChange={e => setImage(e.target.value)} />
                        </div>

                        <div>
                            <input type="file" onChange={uploadFileHandler}/>
                        </div>




                        <input type="submit" className="loginScreen__btn" value="Update Product" onClick={productUpdateHandler} />
                    </form>


                </>}
            </div>

        </div>
    )
}

export default ProductEditScreen

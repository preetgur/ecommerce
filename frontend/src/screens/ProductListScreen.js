import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { deleteProduct, listProduct,createProduct } from '../actions/productActions'
import { deleteUser, userDelete, userList as userListAction } from '../actions/userActions'
import Paginate from '../components/Paginate'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import "./UserListScreen.css"

function ProductListScreen() {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const keyword = location.search
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productList = useSelector(state => state.productList)
    const { loading,  error, products,page,pages } = productList


    const deleteProd = useSelector(state => state.deleteProduct)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = deleteProd
    
    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    useEffect(() => {
        

      
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}`)
        } else {
            dispatch(listProduct(keyword))
        }
    }, [dispatch, successDelete, keyword, successCreate, createdProduct])


    const deletehandler = (id) => {

        if (window.confirm(`Are You Sure You Want To Delete Product With ${id} ?`)) {
        
            dispatch(deleteProduct(id))

        }
    }

    const createProductHandler = () => {

        dispatch(createProduct())
    }

    return (
        <div className="userListScreen">
            <h1>Product List</h1>
            {/* <Link to={"/admin/product/:id?"}> */}
            <button onClick={createProductHandler}><i className="fas fa-plus"></i> Create Product</button>
            {/* </Link> */}
            {errorDelete && <p>{errorDelete}</p>}


            <div className="userListScreen__First">
                {loading ? "loading Product list.." :
                    error ? <p>{error}</p> :
                        (

                        <>
                            <table>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Action</th>
                                </tr>

                                {products?.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>


                                        <td>{
                                            <Link to={`/admin/product/${product._id}`}>
                                                <i className="fas fa-edit" style={{ color: "green" }}></i>
                                            </Link>}

                                            <button onClick={() => deletehandler(product._id)} ><i className="fas fa-trash" style={{}}></i></button>
                                            
                                        </td>



                                    </tr>
                                ))
                                    
                                     
                                }


                            </table>

                                < Paginate page={page} pages={pages} isAdmin={true} />
                            </>
                        )
                }
            </div>
        </div>
    )
}

export default ProductListScreen

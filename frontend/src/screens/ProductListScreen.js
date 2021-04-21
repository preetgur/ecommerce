import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { deleteProduct, listProduct } from '../actions/productActions'
import { deleteUser, userDelete, userList as userListAction } from '../actions/userActions'
import Paginate from '../components/Paginate'
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
    
    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {

            dispatch(listProduct(keyword))
        }
        else {
            history.push('/login')
        }

    }, [dispatch,successDelete,keyword])


    const deletehandler = (id) => {

        if (window.confirm(`Are You Sure You Want To Delete Product With ${id} ?`)) {
        
            dispatch(deleteProduct(id))

        }
    }

    return (
        <div className="userListScreen">
            <h1>Product List</h1>
            <Link to={"/admin/product/:id?"}>
            <button><i className="fas fa-plus"></i> Create Product</button>
            </Link>
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

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { deleteProduct, listProduct,createProduct } from '../actions/productActions'
import { deleteUser, userDelete, userList as userListAction } from '../actions/userActions'
import Paginate from '../components/Paginate'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import "./UserListScreen.css"
import Loading from '../components/Loading'

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

        if (!userInfo?.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}`)
        } else {
            dispatch(listProduct(keyword))
        }
    }, [dispatch, successDelete, keyword, successCreate, createdProduct,userInfo])


    const deleteHandler = (id) => {

        if (window.confirm(`Are You Sure You Want To Delete Product With ${id} ?`)) {
        
            dispatch(deleteProduct(id))

        }
    }

    const createProductHandler = () => {

        dispatch(createProduct())
    }

    return (
        <div className="userListScreen">
            <Row className='align-items-center mx-1'>
                <Col>
                    <h3>Products</h3>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3 ' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {/* </Link> */}
            {errorDelete && <p>{errorDelete}</p>}


            <div className="userListScreen__First">
                {loading ? <Loading message="Product List.."/> :
                    error ? <p>{error}</p> :
                        (

                        <>
                                <Table striped bordered hover responsive className='table-sm'>
                                    <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Action</th>
                                </tr>
                                    </thead>
                                    
                                    <tbody>
                                {products?.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>


                                        <td>
                                            
                                            <LinkContainer to={`/admin/product/${product._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                            
                                        </td>



                                    </tr>
                                ))
                                    
                                     
                                }

                                </tbody>
                            </Table>

                                < Paginate page={page} pages={pages} isAdmin={true} />
                            </>
                        )
                }
            </div>
        </div>
    )
}

export default ProductListScreen

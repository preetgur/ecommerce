import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { myOrder } from '../actions/orderActions'
import { userProfile, userUpdateProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { Form, Row, Col,Button,Table } from 'react-bootstrap'
import './ProfileScreen.css'

function ProfileScreen() {

    const dispatch = useDispatch()
    const history = useHistory()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [isActive, setIsActive] = useState(false)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const userProf = useSelector(state => state.userProfile)
    const { loading, error, user } = userProf

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProf = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProf

    const myOrd = useSelector(state => state.myOrder)
    const { loading: loadingOrder, error: errorOrder, order } = myOrd

    useEffect(() => {

        if (!userInfo ) {
            history.push("/login")
        }

        else {
            if (!user || !user.username || success || userInfo._id !== user._id) {

                dispatch({
                    type: USER_UPDATE_PROFILE_RESET
                })
                dispatch((userProfile(userInfo._id)))   // dispatch userprofile action
                dispatch(myOrder())
            }
            else {
                console.log("user #### ",user)
                setEmail(user.email)
                setName(user.name)
                setIsActive(user.isActive)


            }
        }
    }, [dispatch, history, user, success,userInfo?.email])

    const profileUpdateHandler = (e) => {
        e.preventDefault();
        setMessage("")


        if (password !== confirmPassword) {
            setMessage("Passwords don't match !!!")
        }

        else {

            dispatch(userUpdateProfile(email, name, password,isActive))
        }

    }

    return (
        <div className="profileScreen">

            <div className="profileScreen__container">

                <div className="profileScreen__First">


                    {loading ? <h1>Loading ...</h1> : <>

                        <h1>Profile</h1>

                        {error && <h1 className="profileScreen__error">{error}</h1>}
                        {message && <h1 className="profileScreen__error">{message}</h1>}



                        <Form>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={email} onChange={e => setEmail(e.target.value)} />
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Name
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control  defaultValue={name} onChange={e => setName(e.target.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Password
    </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Confirm Password
                                    </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="password" placeholder="Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group id="formGridCheckbox">
                                <Form.Check type="checkbox" checked={isActive} label="Active Account" onChange={() => setIsActive(!isActive)} />
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={profileUpdateHandler}>
                                Update
                            </Button>

                        </Form>
                       

                    </>}
                </div>

                <div className="profileScreen__second">

                    {    loadingOrder ? (
                    "Loading Orders.."
                ) : errorOrder ? (
                    history.push('/login')
                ) : <>
                        
                            <Table striped bordered hover className='table-sm' responsive="sm" size="sm">
                                <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>

                                    </tr>
                                </thead>

                                <tbody>
                                
                        {user?.email && order && order?.map((item) => (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.createdAt.substring(0, 10)}</td>
                                <td>{item.totalPrice}</td>
                                {/* <td>{item.isPaid ? item.paidAt.substring(0, 10) : "Pending"}</td> */}
                                <td>{item.isPaid ? <i class="far fa-check-circle m-auto text-success"></i>  : "Pending"}</td>


                                <td>{item.isDelivered ?
                                    <i class="far fa-check-circle m-auto text-success"></i> : "pending"
                                }
                                </td>

                                <td><Link to={`order/${item._id}`}>

                                    <p className="profileScreen__btn" >Details</p>
                                </Link>
                                </td>

                            </tr>
                        ))
                        }

                                </tbody>
                    </Table>


                        </>
                    }
                </div>
            </div>

        </div>
    )
}

export default ProfileScreen

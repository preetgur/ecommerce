import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import './Header.css'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()
    // const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    console.log('userinfo header.. ',userInfo);
    
    const logoutHandler = () => {
        dispatch(logout())
    }

    useEffect(() => {
        
       
    }, [userInfo])
    
    return (
        <div className="header">
            <Link to="/" className="header__logo">
                proshop

            </Link>
            <div className="header__options">
                <div className="header__options__one">
                    <Link to="/cart">
                        <i className="fas fa-shopping-cart"></i> cart

                    </Link>
                </div>
                <div className="header__options__two">
                    {userInfo && <Link to="/profile">{userInfo.username} </Link>}
                    
                         
                </div>

                <div className="header__options__two">
                    
                    {userInfo?._id ?
                        <button className="header__logout" onClick={logoutHandler}>
                            Logout
                        </button> :
                        <Link to="/login">
                            <i className="fas fa-user"></i>
                                login
                            </Link>
                    }


                </div>
                

                <div className="header__options__two">
                    {userInfo && userInfo.isAdmin && (<div class="dropdown">
                        <button class="dropbtn">Admin</button>
                        <div class="dropdown-content">
                            <a href={"/admin/userlist"}>users</a>
                            <a href={"/admin/productlist"}>Products</a>
                            <a href={"/admin/orderlist"}>Orders</a>
                        </div>
                    </div>)}

                </div>

            </div>
        </div>
    )
}

export default Header

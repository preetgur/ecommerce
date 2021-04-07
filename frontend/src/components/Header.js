import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import './Header.css'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()
    const localData = JSON.parse(localStorage.getItem('userInfo'))

    const logoutHandler = () => {
        dispatch(logout())
    }
    
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
                    {localData ? localData.username : <Link to="/login">
                        <i className="fas fa-user"></i>
                    login
                    </Link>}
                    
                         
                </div>

                <div className="header__options__two">
                    {localData && <button className="header__logout" onClick={logoutHandler}>Logout</button>}


                </div>
                
            </div>
        </div>
    )
}

export default Header

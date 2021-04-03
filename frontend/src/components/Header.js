import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
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
                    <i className="fas fa-user"></i>
                    login
                </div>
            </div>
        </div>
    )
}

export default Header

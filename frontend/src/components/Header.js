import React from 'react'
import './Header.css'

function Header() {
    return (
        <div className="header">
            <div className="header__logo">proshop</div>
            <div className="header__options">
                <div className="header__options__one">
                   <i className="fas fa-shopping-cart"></i> cart
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

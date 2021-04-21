import React from 'react'
import { Link } from 'react-router-dom'
import './Paginate.css'

function Paginate({ page, pages, keyword = "", isAdmin = false }) {
    
    if (keyword) {
        keyword = keyword.split("?keyword=")[1].split('&')[0]
    }
    console.log('KEyword at paginate .. ', keyword);

    return ( pages > 1 && (
        <div className="paginate">
            {[...Array(pages).keys()].map(x => (

                <Link key={x + 1}
                    to={!isAdmin ?
                    `/?keyword=${keyword}&page=${x + 1}`
                    :`/admin/productlist/?keyword=${keyword}&page=${x + 1}`}>
                    
                    {/* <a target={x+1 === page}>{x + 1}</a> */}
                    {x + 1 === page ?
                        <p className=" p current_page" >{x + 1}</p> :
                        <p className="p">{x + 1}</p>}

                </Link>
            ))}
        </div>)
    )
}

export default Paginate

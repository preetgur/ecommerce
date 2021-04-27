import React from 'react'
import './Rating.css'

function Rating({value,no_of_reviews}) {
    return (
        <div className="rating">
            {/* fontawsome star */}
            {/* <i className="fas fa-star"></i> */}

            <span>
                {/* define logic for stars */}
                <i className={value >= 1? "fas fa-star": value >= 0.5? "fas fa-star-half-alt" : "far fa-star" } ></i>
            </span>

            <span>
             
                <i className={value >= 2 ? "fas fa-star" : value >= 1.5 ? "fas fa-star-half-alt" : "far fa-star"} ></i>
            </span>

            <span>
                
                <i className={value >= 3 ? "fas fa-star" : value >= 2.5 ? "fas fa-star-half-alt" : "far fa-star"} ></i>
            </span>

            <span>
                <i className={value >= 4 ? "fas fa-star" : value >= 3.5 ? "fas fa-star-half-alt" : "far fa-star"} ></i>
            </span>

            <span>
                <i className={value >= 5 ? "fas fa-star" : value >= 4.5 ? "fas fa-star-half-alt" : "far fa-star"} ></i>
            </span>
            
            <span> { no_of_reviews && no_of_reviews} </span>
        </div>
    )
}

export default Rating

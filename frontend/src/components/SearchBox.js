import React, { useState } from 'react'
import { useHistory } from 'react-router'
import "./SearchBox.css"
function SearchBox() {

    const [keyword, setKeyword] = useState("")
    const history = useHistory()

    const searchHandler = (e) => {
        e.preventDefault();
        console.log('search Handler ..', keyword);
        if (keyword) {
            // go to homeScreen page with query params: localhost/?keyword=airpods
            history.push(`/?keyword=${keyword}&page=1`)
    
        }

    }
    return (
        <div className="searchBox">
            <form>
                <input type="text" value={keyword} onChange={ (e) => setKeyword(e.target.value)} className="searchBox__input"/>
                <input type="submit" value="Search" onClick={searchHandler} className="searchBox__btn"/>
            </form>
        </div>
    )
}

export default SearchBox

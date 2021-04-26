import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Form } from 'react-bootstrap'
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
        <Form onSubmit={searchHandler} inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5 m-auto'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Search
            </Button>
        </Form>
    )
}

export default SearchBox

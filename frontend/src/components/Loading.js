import React from 'react'
import { Button,Spinner} from 'react-bootstrap'


function Loading({ message }) {
    return (
        <>
            
            <div className="loading">

            
            <Button variant="dark" className="loading__center" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading {message} ...
            </Button>
            </div>
        </>
    )
}

export default Loading

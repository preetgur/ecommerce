import React from 'react'
import { Button,Spinner} from 'react-bootstrap'


function Loading({ message }) {
    return (
        <>
            

            <Button variant="dark" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading {message} ...
            </Button>
        </>
    )
}

export default Loading

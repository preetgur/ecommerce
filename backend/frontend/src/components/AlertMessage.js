import React from 'react'
import { Alert } from 'react-bootstrap'

function AlertMessage({ variant, children }) {
    return (
        <Alert variant={variant}>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>

            <p> {children}</p>
        </Alert>
    )
}

export default AlertMessage
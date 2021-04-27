import React from 'react'
import "./Footer.css"
import { Container, Row, Col } from "react-bootstrap"

function Footer() {
    return (
        <footer>
            <Container variant="dark" fluid>
                <Row>
                    <Col className="text-center bg-dark footer py-3">Copyright &copy; G-Shop</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer

import React from 'react'
import { Container, Navbar } from 'react-bootstrap';

const Navigation: React.FunctionComponent = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">Navbar</Navbar.Brand>
                </Container>
            </Navbar>

        </>
    )
}

export default Navigation
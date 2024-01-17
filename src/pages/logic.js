import React from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CustomModal from '../components/modal.js'
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Logic() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Link to="/">
                        <Navbar.Brand>Navbar</Navbar.Brand>
                    </Link>
                        <Nav className="ms-auto">
                            <Button onClick={() => setModalShow(true)}>Information</Button>
                            <CustomModal show={modalShow} onHide={() => setModalShow(false)}/>
                        </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Logic;
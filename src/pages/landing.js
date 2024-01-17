import React from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CustomModal from '../components/modal.js'
import Dropdown from '../components/dropdown.js';
import Input from '../components/input.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Landing() {
    const [modalShow, setModalShow] = useState(false);
  
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    const initialQueryParams = {
        selectedCuisine: '',
        selectedPrice: '',
        selectedLocation: ''
    }

    const [queryParams, setQueryParams] = useState(initialQueryParams);

    let queryString = new URLSearchParams(queryParams).toString();

    const updateSelection = (param, stateUpdate, event) => {
        stateUpdate(event);
        setQueryParams((prevParams) => ({
            ...prevParams,
            [param]: event
        }));
        queryString = new URLSearchParams(queryParams).toString();
    }

    const cuisineSelections = ['American', 'Italian']
    const priceRanges = ['$', '$$', '$$$', '$$$$']

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
        
            <div className="container d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <div className="mb-4">
                        <h1>Restaurant Selector</h1>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Dropdown 
                                items={cuisineSelections} 
                                selectionType={'Cuisine'} 
                                onSelect={(value) => updateSelection('selectedCuisine', setSelectedCuisine, value)}/>
                        </div>
                        <div className="col">
                            <Dropdown 
                                items={priceRanges} 
                                selectionType={'Price Range'} 
                                onSelect={(value) => updateSelection('selectedPrice', setSelectedPrice, value)}/>
                        </div>
                        <div className="col">
                            <Input 
                                onSelect={(value) => updateSelection('selectedLocation', setSelectedLocation, value)}/>
                        </div>
                        <div className="col">
                            <Link to={`/logic${queryString ? `?${queryString}` : ''}`}>
                                <Button className="form-control">SEARCH</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Landing;
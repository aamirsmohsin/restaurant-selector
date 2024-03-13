import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import CustomCard from '../Components/Card.js'

function Logic() {
    const [loading, setLoading] = useState(true);
    const [restaurantChoices, setRestaurantChoices] = useState([]);
    const [firstChoice, setFirstChoice] = useState(0);
    const [secondChoice, setSecondChoice] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const queryParams = new URLSearchParams(window.location.search);

          const cuisine = queryParams.get('selectedCuisine');
          const price = queryParams.get('selectedPrice');
          const location = queryParams.get('selectedLocation').replaceAll(' ', '+');
  
          const api_key = process.env.REACT_APP_API_KEY;
  
          const geoResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${api_key}`);
          if (!geoResponse.ok) {
            setError(true);
            throw new Error('Failed to fetch geolocation data');
          }
          const geoData = await geoResponse.json();
          const lat = geoData.results[0].geometry.location.lat.toString();
          const lon = geoData.results[0].geometry.location.lng.toString();
  
          const placesResponse = await fetch(`http://127.0.0.1:5000/places?lat=${lat}&lon=${lon}`);
          if (!placesResponse.ok) {
            setError(true);
            throw new Error('Failed to fetch restaurant data');
          }
          const restaurantData = await placesResponse.json();
  
          const choices = restaurantData.results.slice(0, 10);
          setRestaurantChoices(choices);
          setSecondChoice(choices.length - 1);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setError(true);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

    const onClickFirst = () => {
      setFirstChoice(firstChoice + 1);

      if (firstChoice + 1 === secondChoice) {
        window.location.href = '/';
      }
    }

    const onClickSecond = () => {
      setSecondChoice(secondChoice - 1);
      console.log(secondChoice);

      if (firstChoice === secondChoice - 1) {
        window.location.href = '/';
      }
    }

    if (error) {
      return (
        <div>
          <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Link to="/">
                        <Navbar.Brand>Home</Navbar.Brand>
                    </Link>
                </Container>
            </Navbar>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <h2>Error</h2>
            </div>
        </div>
      )
    }

    if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h2>Loading...</h2>
        </div>
      )
    }

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Link to="/">
                        <Navbar.Brand>Home</Navbar.Brand>
                    </Link>
                </Container>
            </Navbar>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
              <h2 style={{ marginBottom: '35px' }}>Which do you prefer?</h2>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ marginRight: '30px' }} onClick={onClickFirst}>
                  <CustomCard name={restaurantChoices[firstChoice].name} rating={restaurantChoices[firstChoice].rating} numRatings={restaurantChoices[firstChoice].user_ratings_total} photo_reference="..." link="#"/>
                </div>
                <div style={{ marginLeft: '30px' }} onClick={onClickSecond}>
                  <CustomCard name={restaurantChoices[secondChoice].name} rating={restaurantChoices[secondChoice].rating} numRatings={restaurantChoices[secondChoice].user_ratings_total} photo_reference="..." link="#"/>
                </div>
              </div>
            </div>
        </div>
    );
}

export default Logic;
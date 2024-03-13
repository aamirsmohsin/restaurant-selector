import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react'

function CustomCard({ name, rating, numRatings, photo_reference, link, clickHandler }) {

    return (
        <Card style={{ width: '18rem', cursor: 'pointer'}} onClick={clickHandler}>
            <Card.Body>
                <Card.Title>{ name }</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Rating: {rating}, {numRatings} Reviews</Card.Subtitle>
                <Card.Img src="https://i.insider.com/56996a6ae6183e50008b9eae?width=800&format=jpeg&auto=webp"/>
                <Card.Link href="">View Menu!</Card.Link>
            </Card.Body>
        </Card>
      );
}

export default CustomCard;
import { useState } from 'react';
import { Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({productProp}) {
    console.log(productProp);
   
    const { _id, name, description, price} = productProp


    return (
        <Row >
            <Card style={{ width: '20rem' }} className="mh-100 mx-5 mb-5" >
                <Card.Body>
                    <Card.Title className="text-center">
                        <Link style={{textDecoration:'none'}} to={`/courses/${_id}`}>{name}</Link>
                    </Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Card.Text className="text-danger">₱{price}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Link className="btn btn-primary d-block" to={`/courses/${_id}`}>Details</Link>
                </Card.Footer>  
            </Card>
        </Row>
    )
}


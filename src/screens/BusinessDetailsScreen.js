import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Businesses from '../businesses'
import Categories from '../categories'
import Business from '../components/Business'


const BusinessDetailsScreen = ({ match }) => {

    const specificBusiness = Businesses.find((p) => p._id === match.params.id)

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
          </Link>
            <Row>
                <Col md={6}>
                    <Image src={specificBusiness.image} alt={specificBusiness.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{specificBusiness.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {specificBusiness.description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {specificBusiness.conatct}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>List of products/services</p>
                            {specificBusiness.products.split(',').reduce((all, cur) => [
                                ...all,
                                <br />,
                                cur
                            ])}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

        </>
    )
}

export default BusinessDetailsScreen

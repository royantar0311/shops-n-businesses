import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Businesses from '../businesses'
import Categories from '../categories'
import Business from '../components/Business'

const BusinessScreen = ({ match }) => {
    const business = Businesses.filter((p) => p.category === match.params.id)
    const category =Categories.find((p)=>p._id===match.params.id)
    console.log(business)
    return (
        <>
          <Link className='btn btn-light my-3' to='/'>
              Go Back
          </Link>
          <Row>
              <Col md={6}>
                  <Image src={category.image} alt={category.name} fluid/>
              </Col>
              <Col md={3}>
                  <ListGroup variant="flush">
                      <ListGroup.Item>
                          <h3>{category.name}</h3>
                      </ListGroup.Item>
                      <ListGroup.Item>
                         {category.description}
                      </ListGroup.Item>
                  </ListGroup>
              </Col>
          </Row>

          <h1>Business</h1>
            <Row>
                {business.map((busi) => (
                    <Col key={busi._id} sm={12} md={6} lg={4} xl={3}>
                        <Business busi={busi} />
                    </Col>
                ))}
            </Row>

        </>
    )
}

export default BusinessScreen

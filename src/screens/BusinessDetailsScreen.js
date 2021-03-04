import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { auth } from '../configs/firebase.config'

const BusinessDetailsScreen = ({ match, businesses }) => {
    const [specificBusiness, setSpecificBusiness] = useState(undefined); 
    useEffect(() => {
        setSpecificBusiness(businesses.find((p) => p.uid === match.params.businessUid));
        
    }, [setSpecificBusiness, businesses,match]);
    if (specificBusiness === undefined) return `Loading`;
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
          </Link>
            <Row className="text-right">
                <Col md={6}>
                    <Image src={specificBusiness.image} alt={specificBusiness.name} fluid />
                </Col>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h1>{specificBusiness.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>{specificBusiness.description}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <i className="fa fa-phone fa-fw" aria-hidden="true"></i>
                            {specificBusiness.contactNumber}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <i className="fas fa-map-marker-alt fa-fw"></i>

                            {specificBusiness.address}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>List of products/services</h3>
                            {/* {specificBusiness.products.split(',').reduce((all, cur) => [
                                ...all,
                                <br />,
                                cur
                            ])} */}
                            {specificBusiness.products.split(',').map((item, i) => <>
                                <i key={i} className="fas fa-arrow-alt-circle-left fa-fw"></i>
                                {item}
                                <br /> </>)}


                        </ListGroup.Item>

                    </ListGroup>
                </Col>
            </Row>
            <Row className='align-items-center'>
                {specificBusiness.uid === auth.currentUser?.uid ?
                    <Col className='text-center'>
                        <LinkContainer to={`/customer/${specificBusiness.uid}/edit`}>
                            <Button className='my-3'>
                               Edit Business
                  </Button>
                        </LinkContainer>
                    </Col>
                    : null
                }
            </Row>


        </>
    )
}
const mapStateToProps = (state) => ({
    businesses: state.businesses.businesses
})
export default connect(mapStateToProps)(BusinessDetailsScreen);

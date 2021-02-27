import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import { connect } from 'react-redux'

const BusinessDetailsScreen = ({ match, businesses }) => {

    const specificBusiness = businesses.find((p) => p.uid === match.params.businessUid)

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
                            {specificBusiness.contact}
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
const mapStateToProps = (state) => ({
    businesses: state.businesses.businesses
})
export default connect(mapStateToProps)(BusinessDetailsScreen);

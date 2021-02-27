import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import Business from '../components/Business'
import { connect } from 'react-redux'
const BusinessScreen = ({ match, categories, businesses }) => {
    const business = businesses.filter((p) => p.categoryUid === match.params.categoryUid)
    const category = categories.find((p)=>p.uid===match.params.categoryUid)
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
                    <Col key={busi.uid} sm={12} md={6} lg={4} xl={3}>
                        <Business busi={busi} />
                    </Col>
                ))}
            </Row>
        </>
    )
}
const mapStateToProps = (state)=>({
    categories: state.categories.categories,
    businesses: state.businesses.businesses
})
export default connect(mapStateToProps)(BusinessScreen);

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { auth } from '../configs/firebase.config'
import Loader from '../components/Loader'

const BusinessDetailsScreen = ({ match, businesses }) => {

    const [name, setName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [address, setAddress] = useState('')
    const [category, setCategory] = useState('')
    const [products, setProducts] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [uid, setUid] = useState('');
    useEffect(() => {
        const specificBusiness = businesses.find((p) => p.uid === match.params.businessUid);
        if(specificBusiness === undefined)return;
        if(specificBusiness.isApproved === true){
            setName(specificBusiness.name);
            setContactNumber(specificBusiness.contactNumber);
            setAddress(specificBusiness.address);
            setCategory(specificBusiness.category);
            setProducts(specificBusiness.products);
            setImage(specificBusiness.image);
            setUid(specificBusiness.uid);
            setDescription(specificBusiness.description);
        }
        else {
            setName(specificBusiness.newName);
            setContactNumber(specificBusiness.newContactNumber);
            setAddress(specificBusiness.newAddress);
            setCategory(specificBusiness.newCategory);
            setProducts(specificBusiness.newProducts);
            setImage(specificBusiness.newImage);
            setUid(specificBusiness.uid);
            setDescription(specificBusiness.description);
        }
    }, [businesses, match]);
    if (name === undefined) return <Loader/>;
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
          </Link>
            <Row className="text-right">
                <Col md={6}>
                    <Image src={image} alt={name} fluid />
                </Col>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h1>{name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>{description}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <i className="fa fa-phone fa-fw" aria-hidden="true"></i>
                            {contactNumber}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <i className="fas fa-map-marker-alt fa-fw"></i>

                            {address}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>List of products/services</h3>
                            {products.split(',').map((item, i) => <>
                                <i key={i} className="fas fa-arrow-alt-circle-left fa-fw"></i>
                                {item}
                                <br /> </>)}


                        </ListGroup.Item>

                    </ListGroup>
                </Col>
            </Row>
            <Row className='align-items-center'>
                {uid === auth.currentUser?.uid ?
                    <Col className='text-center'>
                        <LinkContainer to={`/customer/${uid}/edit`}>
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

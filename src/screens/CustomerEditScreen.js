import React,{ useEffect } from 'react'
import { useState } from 'react'
import { Form, Button, Image } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Message from '../components/Message';
import { setBusiness, fetchBusinesses } from '../redux/firestore/businesses/businesses.actions';

const CustomerEditScreen = ({ match, isAdmin, businesses, categories }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const business = businesses.find((p) => p.uid === match.params.id)

    const [name, setName] = useState(business.name)
    const [contactNumber, setContactNumber] = useState(business.contactNumber)
    const [address, setAddress] = useState(business.address)
    const [category, setCategory] = useState(business.category)
    const [products, setProducts] = useState(business.products)
    const [description, setDescription] = useState(business.description)
    const [image, setImage] = useState(business.image)
    const [message, setMessage] = useState(null);

    const uploadFileHandler = async (e) => {
        let file = e.target.files[0];
        let fileType = file.type;
        if( file === undefined || file.size === 0 || 
            !(fileType === "image/jpg" || fileType === "image/jpeg" || fileType === "image/png")){
            return;
        }
        let reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        try {
            dispatch(setBusiness({
                name,
                contactNumber,
                address,
                products,
                category,
                description,
                image,
                uid: business.uid,
                isApproved: false
            }));
            history.push(`/businessdetails/${business.uid}`);
        } catch (err) {
            setMessage(err.message);
        }
        
    }

    return (
        <>
            <FormContainer>
                <h1>Edit & Approve</h1>
                {message && <Message variant={"danger"}>{message}</Message>}
                <Form onSubmit={submitHandler} className="text-right">
                    <Form.Group controlId='name'>
                        <Form.Label>Business Name</Form.Label>
                        <Form.Control
                            type='name'
                            required
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>



                    <Form.Group controlId='contactNumber'>
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                            type='text'
                            required
                            placeholder='Enter Contact Number'
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Address'
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="category">
                    <Form.Label>Select category</Form.Label>
                    <Form.Control
                        as="select"
                        value={category}
                        required
                        onChange={e => {
                            console.log("e.target.value", e.target.value);
                            setCategory(e.target.value);
                        }}>
                        <option value="">
                            --Select Category--
                        </option>
                        {categories.map(
                            (cat) => (
                                <option key={cat.uid} value={cat.name}>{cat.name}</option>
                            )
                        )}
                    </Form.Control>
                </Form.Group>

                    <Form.Group controlId="products">
                        <Form.Label>Enter product name (Separate product by comma)</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            placeholder='Enter Products Name'
                            required
                            value={products}
                            onChange={(e) => setProducts(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea" rows={3}
                            required
                            placeholder='Enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Image src={business.image} alt={business.name} fluid />
                        <Form.File
                            id='image-file'
                            label=''
                            custom
                            onChange={uploadFileHandler}
                        ></Form.File>
                    </Form.Group>
                        <Button type='submit' variant='primary'>
                            Submit
                        </Button> 
                    
                </Form>


            </FormContainer>

        </>
    )
}

const mapStateToProps = (state) => ({
    businesses: state.businesses.businesses,
    categories: state.categories.categories
})
export default connect(mapStateToProps)(CustomerEditScreen);

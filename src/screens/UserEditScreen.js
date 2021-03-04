import React,{ useEffect } from 'react'
import { useState } from 'react'
import { Form, Button, Image } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { setBusiness, fetchBusinesses } from '../redux/firestore/businesses/businesses.actions';
import Message from '../components/Message'

const UserEditScreen = ({ match, isAdmin, businesses, categories }) => {

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
    const [isApproved] = useState(business.isApproved);
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
    const validate = () => {
        setMessage(null);
        return true;
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if(!validate())return;
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
                isApproved: true
            }));
            dispatch(fetchBusinesses());
            history.push('/admin/userlist');
        } catch (err) {
            setMessage(err.message);
        }
        
    }
    useEffect(() => {
        if(isAdmin === 'false')history.push('/');
    }, [isAdmin,history])

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
                            required
                            placeholder='Enter Address'
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
                                setCategory(e.target.value);
                            }}>
                            <option value="DICTUM">Dictamen</option>
                            <option value="CONSTANCY">Constancia</option>
                            <option value="COMPLEMENT">Complemento</option>
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
                            placeholder='Enter description'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Image src={business.image} alt={business.name} fluid />
                        {/* <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control> */}
                        <Form.File
                            id='image-file'
                            label='Choose File'
                            required
                            custom
                            onChange={uploadFileHandler}
                        ></Form.File>
                    </Form.Group>
                    {isApproved === false ?
                        <Button type='submit' variant='primary'>
                            Approve
                        </Button> 
                        :
                        null
                    }
                    
                </Form>


            </FormContainer>

        </>
    )
}

const mapStateToProps = (state) => ({
    isAdmin: state.auth.isAdmin,
    businesses: state.businesses.businesses,
    categories: state.categories.categories
})
export default connect(mapStateToProps)(UserEditScreen);


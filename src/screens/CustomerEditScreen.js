import React,{ useEffect } from 'react'
import { useState } from 'react'
import { Form, Button, Image } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Message from '../components/Message';
import { setBusiness } from '../redux/firestore/businesses/businesses.actions'
import { auth } from '../configs/firebase.config'
import Loader from '../components/Loader';

const CustomerEditScreen = ({ match, isAdmin, businesses, categories }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [address, setAddress] = useState('')
    const [category, setCategory] = useState('')
    const [products, setProducts] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [message, setMessage] = useState(null);

    useEffect(() => {

        const specificBusiness = businesses.find((business) => {
            console.log(business.uid + " " + match.params.id)
            return business.uid === match.params.id
        });
        if(specificBusiness === undefined)return;
        if(specificBusiness.isApproved === true){
            setName(specificBusiness.name);
            setContactNumber(specificBusiness.contactNumber);
            setAddress(specificBusiness.address);
            setCategory(specificBusiness.category);
            setProducts(specificBusiness.products);
            setImage(specificBusiness.image);
            setDescription(specificBusiness.description);
        }
        else {
            setName(specificBusiness.newName);
            setContactNumber(specificBusiness.newContactNumber);
            setAddress(specificBusiness.newAddress);
            setCategory(specificBusiness.newCategory);
            setProducts(specificBusiness.newProducts);
            setImage(specificBusiness.newImage);
            setDescription(specificBusiness.description);
        }

    }, [businesses, 
        match, setName, setContactNumber, 
        setProducts, setAddress, 
        setImage, setDescription, 
        setCategory]);

    const uploadFileHandler = async (e) => {
        let file = e.target.files[0];
        let fileType = file.type;
        if( file === undefined || file.size === 0 || 
            !(fileType === "image/jpg" || fileType === "image/jpeg" || fileType === "image/png")){
                setMessage('please upload an image!');
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
                newName: name,
                newContactNumber: contactNumber,
                newAddress: address,
                newProducts: products,
                newDescription: description,
                newCategory: category,
                newImage: image,
                uid: auth.currentUser.uid,
                isApproved: false
            }));
            history.push(`/businessdetails/${auth.currentUser.uid}`);
        } catch (err) {
            setMessage(err.message);
        }
        
    }
    if(name === undefined)return <Loader/>;
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
                        <Image src={image} alt={name} fluid />
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

import React from 'react';
import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message'
import FormContainer from '../components/FormContainer';
import { auth } from '../configs/firebase.config';
import { useDispatch } from 'react-redux';
import { setBusiness } from '../redux/firestore/businesses/businesses.actions'
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';


const RegisterScreen = ({ categories }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [contactNumber, setContactNumber] = useState("")
    const [address, setAddress] = useState('')
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState(null);

    const [products, setProducts] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const uploadFileHandler = async (e) => {

        let file = e.target.files[0];
        let fileType = file.type;
        if (file === undefined || file.size === 0 ||
            !(fileType === "image/jpg" || fileType === "image/jpeg" || fileType === "image/png")) {
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
        if(password !== confirmPassword){
            setMessage('passwords do not match');
            return false;
        }
        return true;
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if(!validate())return;
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            dispatch(setBusiness({
                newName: name,
                newContactNumber: contactNumber,
                newAddress: address,
                newProducts: products,
                newDescription: description,
                newCategory: category,
                newImage: image,
                newEmail: email,
                uid: auth.currentUser.uid,
                isApproved: false
            }));
            history.push('/');
        } catch (err) {
            setMessage(err.message);
        }
        
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant={"danger"}>{message}</Message>}
            <Form onSubmit={submitHandler} className="text-right">
                <Form.Group controlId='name'>
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='contactNumber'>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Contact Number'
                        value={contactNumber}
                        required
                        onChange={(e) => setContactNumber(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Address'
                        value={address}
                        required
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
                        value={products}
                        required
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
                    <Form.Label>Image</Form.Label>
                    <Card.Img src={image} variant='top' />
                    <Form.File
                        id='image-file'
                        label=''
                        custom
                        onChange={uploadFileHandler}
                    ></Form.File>
                </Form.Group>



                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        required
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
        </Button>
            </Form>


        </FormContainer>
    )
}
const mapStateToProps = (state) => ({
    categories: state.categories.categories,
})
export default connect(mapStateToProps)(RegisterScreen);

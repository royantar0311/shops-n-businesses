import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {  auth } from '../configs/firebase.config';
import { useDispatch } from 'react-redux';
import { fetchBusinesses, setBusiness } from '../redux/firestore/businesses/businesses.actions'
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';


const RegisterScreen = ({categories}) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [address, setAddress] = useState('')
    const [categoryUid, setCategoryUid] = useState('')
    const [categoryName, setCategoryName] = useState('select category')

    const [products, setProducts] = useState('')
    const [description, setDescription] = useState('')
    const [image,setImage]=useState(null)
    const [fileName, setFileName] = useState('No Images Selected');
    const uploadFileHandler = async (e) => {
        console.log(e.target.value);
        let file = e.target.files[0];
        let fileType = file.type;
        if( file === undefined || file.size === 0 || 
            !(fileType === "image/jpg" || fileType === "image/jpeg" || fileType === "image/png")){
            return;
        }
        let reader = new FileReader();
        setFileName('image loading...');
        reader.onload = () => {
            setImage(reader.result);
            setFileName(file.name);
        }
        reader.readAsDataURL(file);
    }
    
    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword)return;

        try{
            await auth.createUserWithEmailAndPassword(email, password);
            dispatch(setBusiness({
                name,
                contactNumber,
                address,
                categoryUid,
                products,
                description,
                image,
                email,
                uid: auth.currentUser.uid,
                isApproved: false
            }));
            dispatch(fetchBusinesses());
        }catch(err){
            console.log(err.message);
        } 
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        history.push('/');
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='contactNumber'>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                        type='text'
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
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="category">
                    <Form.Label>Select category</Form.Label>
                    <Form.Control
                        as="select"
                        value = {categoryName}
                        onChange={e => {
                            console.log(e.target.value)
                            setCategoryUid(e.target.value);
                            const { name } = categories.find(element => element.uid === e.target.value);
                            console.log(name);
                            if(name !== undefined)setCategoryName(name);
                            else setCategoryName('select category')
                        }}>
                           
                        <option value="ixK3hXK2uoHp6RomRX1N">Drink</option>
                        <option value="wSxI9A4XMA6UbETiy4cU">Food</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="products">
                    <Form.Label>Enter product name (Separate product by comma)</Form.Label>
                    <Form.Control as="textarea" rows={3}
                        placeholder='Enter Products Name'
                        value={products}
                        onChange={(e) => setProducts(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea" rows={3}
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder={fileName}
                        disabled
                        value={fileName}
                    ></Form.Control>
                    <Form.File
                        id='image-file'
                        label='Choose File'
                        custom
                        onChange={uploadFileHandler}
                    ></Form.File>
                </Form.Group>



                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
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

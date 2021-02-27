import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const RegisterScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [address, setAddress] = useState('')
    const [category, setCategory] = useState('')
    const [products, setProducts] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')



    const uploadFileHandler = async (e) => {

    }

    const submitHandler = (e) => {
        e.preventDefault()

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
                        value={category}
                        onChange={e => {
                            console.log("e.target.value", e.target.value);
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
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
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

export default RegisterScreen

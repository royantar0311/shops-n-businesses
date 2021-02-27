import React from 'react'
import users from '../businesses'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const UserEditScreen = ({ match }) => {
    const user = users.find((p) => p._id === match.params.id)

    const [name, setName] = useState(user.name)
    const [contactNumber, setContactNumber] = useState(user.conatct)
    const [address, setAddress] = useState(user.address)
    const [category, setCategory] = useState(user.category)
    const [products, setProducts] = useState(user.products)
    const [description, setDescription] = useState(user.description)
    const [image, setImage] = useState(user.image)

    const uploadFileHandler = async (e) => {

    }

    const submitHandler = (e) => {
        e.preventDefault()

    }

    return (
        <div>
            <FormContainer>
                <h1>Edit & Approve</h1>
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

                    <Button type='submit' variant='primary'>
                        Approve
        </Button>
                </Form>


            </FormContainer>

        </div>
    )
}

export default UserEditScreen

import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const UserCategoryScreen = () => {

    const [categoryName, setCategoryName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const uploadFileHandler = async (e) => {

    }

    const submitHandler = (e) => {
        e.preventDefault()

    }

    return (
        <>
            <FormContainer>
                <h1>Add Category</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        ></Form.Control>
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
                        Add Category
    </Button>
                </Form>


            </FormContainer>

        </>
    )
}

export default UserCategoryScreen

import React, { useEffect } from 'react'
import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addCategory,fetchCategories } from '../redux/firestore/categories/categories.actions';
import { db } from '../configs/firebase.config';
import Message from '../components/Message';

const UserCategoryScreen = ({isAdmin}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [categoryName, setCategoryName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
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
        const newRef = db.collection('categories').doc();
        dispatch(addCategory({
            description,
            image,
            uid: newRef.id,
            name: categoryName
        }));
        dispatch(fetchCategories());
        history.push('/admin/categorylist');
    }
    useEffect(() => {
        if(isAdmin === 'false')history.push('/');
    }, [isAdmin,history])

    return (
        <>
            <FormContainer>
                <h1>Add Category</h1>
                {message && <Message variant={"danger"}>{message}</Message>}
                <Form onSubmit={submitHandler} className="text-right">
                    <Form.Group controlId='name'>
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            type='name'
                            required
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
                            required
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Card.Img src = {image} ></Card.Img>
                        <Form.File
                            id='image-file'
                            label=''
                            custom
                            required
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
const mapStateToProps = (state) => ({
    isAdmin: state.auth.isAdmin
})
export default connect(mapStateToProps)(UserCategoryScreen);

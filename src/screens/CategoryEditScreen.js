import React, { useEffect } from 'react'
import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addCategory,editCategory,fetchCategories } from '../redux/firestore/categories/categories.actions';
import Message from '../components/Message';
import { auth, db } from '../configs/firebase.config';
import Loader from '../components/Loader';
import { editBusinessCategory, fetchBusinesses } from '../redux/firestore/businesses/businesses.actions';

const CategoryEditScreen = ({isAdmin, match, categories, businesses}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [categoryName, setCategoryName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [message, setMessage] = useState(null);
    const [uid, setUid] = useState(''); 
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
        try{
            dispatch(editCategory({
                description,
                image,
                uid,
                name: categoryName
            }));
            dispatch(editBusinessCategory(businesses, match.params.id, categoryName))
            history.push('/admin/categorylist');
        }catch(err){
            setMessage(err.message);
        }
        
    }
    console.log("uid"+uid);
    useEffect(()=>{
        setCategoryName(match.params.id);

        if(categories === undefined)return;
        const { image, description, uid } = categories.filter(category => category.name === match.params.id)[0];
        setImage(image);
        setUid(uid);
        setDescription(description);
    }, [setCategoryName, match,categories])
    useEffect(() => {
        if(isAdmin === 'false')history.push('/');
    }, [isAdmin,history])

    if(isAdmin === 'loading' || categories === undefined || categoryName === undefined)return <Loader/>;
    return (
        <>
            <FormContainer>
                <h1>Edit Category</h1>
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
                            onChange={uploadFileHandler}
                        ></Form.File>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Edit Category
    </Button>
                </Form>


            </FormContainer>

        </>
    )
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    isAdmin: state.auth.isAdmin,
    businesses: state.businesses.businesses
})
export default connect(mapStateToProps)(CategoryEditScreen);

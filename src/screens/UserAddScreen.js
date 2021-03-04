import React from 'react'
import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, connect } from 'react-redux';
import { addBusiness } from '../redux/firestore/businesses/businesses.actions';
import { db } from '../configs/firebase.config'
const UserAddScreen = ({ categories }) => {

    const dispatch = useDispatch();

    const [name, setName] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [address, setAddress] = useState("")
    const [category, setCategory] = useState("")
    const [products, setProducts] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")

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

    const submitHandler = async (e) => {
        e.preventDefault()
        let newRef = await db.collection("businesses").doc();
        console.log(newRef.get);
        // dispatch(addBusiness({
        //     name,
        //     contactNumber,
        //     address,
        //     products,
        //     description,
        //     category,
        //     image,
        //     isApproved: true
        // }, newRef));

    }

    return (
        <>
            <FormContainer>
                <h1>Add Business</h1>
                <Form onSubmit={submitHandler} className="text-right">
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
                            <option value="">
                                --Select Category--
          </option>
          {console.log(categories)}
                            {categories.map(
                                (cat) => (
                                    <option value={cat.name}>{cat.name}</option>
                                )
                            )}
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
                        <Card.Img src={image}></Card.Img>
                        <Form.File
                            id='image-file'
                            label=''
                            custom
                            onChange={uploadFileHandler}
                        ></Form.File>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Add Business
    </Button>
                </Form>


            </FormContainer>

        </>
    )
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories
})
export default connect(mapStateToProps)(UserAddScreen)

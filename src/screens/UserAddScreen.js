import React,{ useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, connect } from 'react-redux';
import { setBusiness } from '../redux/firestore/businesses/businesses.actions';
import { db } from '../configs/firebase.config'
import Message from '../components/Message';
const UserAddScreen = ({ categories, isAdmin }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [address, setAddress] = useState("")
    const [category, setCategory] = useState("")
    const [products, setProducts] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [message, setMessage] = useState(null);

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
        return true;
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        if(!validate())return;
        try {
            let newRef = await db.collection("businesses").doc();
            dispatch(setBusiness({
            name,
            contactNumber,
            address,
            products,
            description,
            category,
            image,
            uid: newRef.id,
            isApproved: true
        }));
        history.push('/admin/userlist')
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
                <h1>Add Business</h1>
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
                            required
                            value={category}
                            onChange={e => {
                                console.log("e.target.value", e.target.value);
                                setCategory(e.target.value);
                            }}>
                            <option value="">
                                --Select Category--
          </option>
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
                            required
                            onChange={(e) => setProducts(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea" rows={3}
                            placeholder='Enter description'
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Card.Img src={image}></Card.Img>
                        <Form.File
                            id='image-file'
                            label=''
                            required
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
    categories: state.categories.categories,
    isAdmin: state.auth.isAdmin
})
export default connect(mapStateToProps)(UserAddScreen)

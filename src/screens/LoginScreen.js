import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { auth } from '../configs/firebase.config';
import { useHistory } from "react-router-dom";
import Message from '../components/Message';
import { connect } from 'react-redux'
const LoginScreen = ({isAdmin, user}) => {
    const history = useHistory();


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null);

    const validate = () => {
        setMessage(null);
        return true;
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if(!validate())return;
       try{ 
        await auth.signInWithEmailAndPassword(email, password);
        history.push('/');
       }catch(err){
           setMessage(err.message);
       }
    }
    return (
        <FormContainer>
            <h1> Sign In</h1>
            {message && <Message variant={"danger"}>{message}</Message>}
            <Form onSubmit={submitHandler} className="text-right">
                <Form.Group controlId="email">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) =>
                        setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) =>
                        setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant="primary">
                    Sign In
                </Button>

            </Form>

            <Row className='py-3 text-right'>
                <Col>
                    New Customer?{' '}
                    <Link to={'/register'}>
                        Register
          </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}
const mapStateToProps = (state) => ({
    isAdmin: state.auth.isAdmin,
    user: state.auth.currentUser
  })
export default connect(mapStateToProps)(LoginScreen);

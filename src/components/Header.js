import React, { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth } from '../configs/firebase.config';
import { Row, Col, Form, Button } from 'react-bootstrap'
const Header = ({ user, isAdmin }) => {
    const history = useHistory();
    const [search, setSearch] = useState("");

    const submitHandler = (e) => {
        e.preventDefault()

        history.push(`/search/${search}`);
        // const temp = categories.filter((cat) => cat.name.toLowerCase().includes(search) === true || cat.description.toLowerCase().includes(search)===true)
        // // console.log(temp)
        // setFilteredCategory(temp)
    }

    const handleSignOut = (e) => {
        e.preventDefault();
        auth.signOut();
        history.push('/');
    }
    return (
        <header>


            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>

                    <LinkContainer to='/'>
                        <Navbar.Brand>Business</Navbar.Brand>
                    </LinkContainer>



                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <>  {user && user !== undefined && isAdmin !== 'loading' ?
                                isAdmin === 'true' ?
                                    <>
                                        <LinkContainer to='/admin/userlist'>
                                            <Nav.Link>
                                                <i className="fas fa-user-cog fa-fw "></i>
                                                        Admin Panel
                                            </Nav.Link>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/categorylist'>
                                            <Nav.Link>
                                                <i className="fas fa-list-alt fa-fw"></i>
                                                        Category List
                                            </Nav.Link>
                                        </LinkContainer>
                                    </>

                                    :
                                    <LinkContainer to={`/businessdetails/${auth.currentUser.uid}`}>
                                        <Nav.Link>
                                            <i className="fas fa-user-edit fa-fw"></i>
                                                    Edit Business
                                            </Nav.Link>
                                    </LinkContainer>

                                : null

                            }
                                {user && user != null ?
                                    <>
                                        <Nav.Link to='/' onClick={(e) => handleSignOut(e)}>
                                            <i className="fas fa-user fa-fw"></i>
                                        Sign out
                                    </Nav.Link>
                                    </>
                                    :
                                    <LinkContainer to='/login'>
                                        <Nav.Link >
                                            <i className="fas fa-user fa-fw"></i>
                                    Sign In
                                    </Nav.Link>
                                    </LinkContainer>
                                }

                            </>
                        </Nav>
                    </Navbar.Collapse>
                    <Form onSubmit={submitHandler} inline>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                type='text'
                                name='q'
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder='Search Categories'
                                className='mr-sm-2 ml-sm-5'
                            ></Form.Control>
                            <Button type='submit' variant='outline-success' className='p-2'>
                                Search
                 </Button>
                        </Form.Group>
                    </Form>
                </Container>
            </Navbar>
        </header >
    )
}
const mapStateToProps = (state) => ({
    user: state.auth.currentUser,
    isAdmin: state.auth.isAdmin
})
export default connect(mapStateToProps)(Header);

import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux';
import { auth } from '../configs/firebase.config';
const Header = ({user}) => {
    console.log(user);
    const handleSignOut = (e) => {
        console.log('here');
        e.preventDefault();
        auth.signOut();
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
                             {user && user != null? 
                               <Nav.Link to='/' onClick={(e) => handleSignOut(e)}>
                                <i className="fas fa-user"></i>
                                    Sign out
                                </Nav.Link>
                            : 
                                <LinkContainer to='/login'>
                                    <Nav.Link >
                                        <i className="fas fa-user"></i>
                                    Sign In
                                    </Nav.Link>
                            </LinkContainer>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}
const mapStateToProps = (state) => ({
    user: state.auth.currentUser
}) 
export default connect(mapStateToProps)(Header);

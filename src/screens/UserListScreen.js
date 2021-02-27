import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'

import users from '../businesses'


const UserListScreen = () => {

    const deleteHandler = (id) => {

    }

    return (
        <>
            <Row className='align-items-center'>
                <Col className='text-left'>
                    <LinkContainer to={`/admin/user/addbusiness`}>
                        <Button className='my-3'>
                            <i className='fas fa-plus'></i> Create Business
          </Button>
                    </LinkContainer>
                </Col>
                <Col className='text-right'>
                    <LinkContainer to={`/admin/user/addcategory`}>
                        <Button className='my-3'>
                            <i className='fas fa-plus'></i> Create Category
          </Button>
                    </LinkContainer>
                </Col>
            </Row>


            <h1>Users</h1>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Business Name</th>
                        <th>Email</th>
                        <th>Approval Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </td>
                            <td>
                                {user.isApproved ? (
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(user._id)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default UserListScreen

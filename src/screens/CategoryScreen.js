import React,{useState,useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
const CategoryScreen = ({isAdmin,categories}) => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        history.push('/admin/categorylist');
    }, [categories, history])

    useEffect(() => {
        if(isAdmin === 'false')history.push('/');
    }, [isAdmin,history])

    return (
        <>  
            <Row className='align-items-center'>
                <Col className='text-right'>
                    <LinkContainer to={`/admin/addcategory`}>
                        <Button className='my-3'>
                            <i className='fas fa-plus'></i> Create Category
          </Button>
                    </LinkContainer>
                </Col>
            </Row>


            <h1>Categories</h1>
            <Table striped bordered hover responsive className='table-sm text-right' >
                <thead>
                    <tr>
                        <th>Categories Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.uid}>
                            <td>{category.name}</td>
                            <td>
                                <LinkContainer to={`/admin/category/${category.name}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

const mapStateToProps = (state) => ({
    isAdmin: state.auth.isAdmin,
    categories: state.categories.categories
})
export default connect(mapStateToProps)(CategoryScreen)

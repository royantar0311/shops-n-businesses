import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Category from '../components/Category'
import { connect } from 'react-redux'
import Loader from '../components/Loader'

const HomeScreen = ({ categories, isLoading, isAdmin }) => {

    const [search, setSearch] = useState("");
    const [filteredCategory, setFilteredCategory] = useState(categories)


    const submitHandler = (e) => {
        e.preventDefault()
        const temp = categories.filter((cat) => cat.name.toLowerCase().includes(search) === true || cat.description.toLowerCase().includes(search)===true)
        console.log(temp)
        setFilteredCategory(temp)
    }

    useEffect(() => {
        setFilteredCategory(categories)
    }, [categories, setFilteredCategory])

    if(isLoading || isAdmin === 'loading')return <Loader/>
    return (
        <>
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


            <h1>Categories</h1>
            {console.log(filteredCategory)}
            <Row className="text-right">
                {filteredCategory.map((category) => {
                    return (
                        <Col key={category.uid} sm={12} md={6} lg={4} xl={3}>
                            <Category key={category.uid} category={category} />
                        </Col>
                    )
                })}
            </Row>

        </>
    )
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    isLoading: state.categories.isLoading,
    isAdmin: state.auth.isAdmin
})
export default connect(mapStateToProps)(HomeScreen);

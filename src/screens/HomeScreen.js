import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Category from '../components/Category'
import { connect } from 'react-redux'
import Loader from '../components/Loader'

const HomeScreen = ({ categories, isLoading, isAdmin }) => {

    const [filteredCategory, setFilteredCategory] = useState(categories)    

    useEffect(() => {
        setFilteredCategory(categories)
    }, [categories, setFilteredCategory])

    if(isLoading || isAdmin === 'loading')return <Loader/>
    return (
        <>

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

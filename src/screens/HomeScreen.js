import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Category from '../components/Category'
import { connect } from 'react-redux'
import Loader from '../components/Loader'
const HomeScreen = ({categories, isLoading}) => {
    
    if(isLoading)return <Loader/>
    return (
        <>
            <h1>Categories</h1>
            <Row className="text-right">
                {categories.map((category) => {
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

const mapStateToProps = (state)=>({
    categories: state.categories.categories,
    isLoading: state.categories.isLoading
})
export default connect(mapStateToProps)(HomeScreen);

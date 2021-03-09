import React, { useState, useEffect } from 'react'
import { Row, Col, Pagination } from 'react-bootstrap'
import Category from '../components/Category'
import { connect } from 'react-redux'
import Loader from '../components/Loader'

const perPageMax = 8;

const HomeScreen = ({ categories, isLoading, isAdmin }) => {

    const [filteredCategory, setFilteredCategory] = useState(categories)    
    const [active, setActive] = useState(1);
    useEffect(() => {
        let index = active;
        index--;
        let temp = [];
        for(let i=index*perPageMax;i<index*perPageMax+perPageMax && i<categories.length;i++){
            temp.push(categories[i]);
        }
        setFilteredCategory(temp);
    }, [categories, setFilteredCategory, active])

    const paginate = (e)=>{
        e.preventDefault();
        let index = Number(e.target.innerText);
        if(isNaN(index))return;
        setActive(index);
    }

    if(isLoading === true || isAdmin === 'loading')return <Loader/>
    let items = [];
    for (let number = 1; number <= Math.ceil(categories.length/perPageMax); number++) {
        items.push(
            <Pagination.Item key={number} onClick={paginate} active={number === active}>
            {number}
            </Pagination.Item>,
        );
    }
    return (
        <>
            <h1>Categories</h1>
            <Row className="text-right">
                {filteredCategory.map((category) => {
                    if(category.uid === undefined)return null;
                    return (
                        <Col key={category.uid} sm={12} md={6} lg={4} xl={3}>
                            <Category key={category.uid} category={category} />
                        </Col>
                    )
                })}
            </Row>
                <div>
                    <Pagination size="sm">{items}</Pagination>
                </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    isLoading: state.categories.isLoading,
    isAdmin: state.auth.isAdmin
})
export default connect(mapStateToProps)(HomeScreen);

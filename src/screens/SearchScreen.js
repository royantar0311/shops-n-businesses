import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Pagination } from 'react-bootstrap'
import Category from '../components/Category'
import Business from '../components/Business'
import Loader from '../components/Loader'

const perPageMax = 4;


const SearchScreen = ({ match, categories, businesses }) => {
    const [search, setSearch] = useState(undefined)
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [filteredBusiness, setFilteredBusiness] = useState([]);
    const [paginatedBusiness, setPaginatedBusiness] = useState([]);
    const [paginatedCategory, setPaginatedCategory] = useState([]);
    const [activeCategory, setActiveCategory] = useState(1);
    const [activeBusiness, setActiveBusiness] = useState(1);

    useEffect(() => {
        setSearch(match.params.id.toLowerCase())
        const temp = categories.filter((cat) => cat.name.toLowerCase().includes(search) === true || cat.description.toLowerCase().includes(search) === true)
        setFilteredCategory(temp)

        const temp2 = businesses.filter((bus) => bus.name.toLowerCase().includes(search) === true
            || bus.description.toLowerCase().includes(search) === true
            || bus.products.toLowerCase().includes(search) === true)
        setFilteredBusiness(temp2);
    }, [categories, businesses, match, search])

    useEffect(() => {
        let index = activeCategory;
        index--;
        let temp = [];
        for(let i=index*perPageMax;i<index*perPageMax+perPageMax && i<filteredCategory.length;i++){
            temp.push(filteredCategory[i]);
        }
        setPaginatedCategory(temp);
    }, [activeCategory, filteredCategory])

    useEffect(() => {
        let index = activeBusiness;
        index--;
        let temp = [];
        for(let i=index*perPageMax;i<index*perPageMax+perPageMax && i<filteredBusiness.length;i++){
            temp.push(filteredBusiness[i]);
        }
        setPaginatedBusiness(temp);
    }, [setPaginatedBusiness, activeBusiness, filteredBusiness])

    const paginateCategory = (e) => {
        e.preventDefault();
        let index = Number(e.target.innerText);
        if(isNaN(index))return;
        setActiveCategory(index);
    }

    const paginateBusiness = (e) => {
        e.preventDefault();
        let index = Number(e.target.innerText);
        if(isNaN(index))return;
        setActiveBusiness(index);
    }
    let categoryItems = [];
    for (let number = 1; number <= Math.ceil(filteredCategory.length/perPageMax); number++) {
        categoryItems.push(
            <Pagination.Item key={number} onClick={paginateCategory} active={number === activeCategory}>
            {number}
            </Pagination.Item>,
        );
    }

    let businessItems = [];
    for (let number = 1; number <= Math.ceil(filteredBusiness.length/perPageMax); number++) {
        businessItems.push(
            <Pagination.Item key={number} onClick={paginateBusiness} active={number === activeBusiness}>
            {number}
            </Pagination.Item>,
        );
    }
    if (filteredCategory === undefined || match.params.id === undefined || filteredBusiness === undefined) return <Loader />;
    return (
        <>
            <h1>Categories</h1>
            <Row className="text-right">
                {paginatedCategory.map((category) => {
                    return (
                        <Col key={category.uid} sm={12} md={6} lg={4} xl={3}>
                            <Category key={category.uid} category={category} />
                        </Col>
                    )
                })}
            </Row>
            <div>
                <Pagination size="sm">{categoryItems}</Pagination>
            </div>


            <h1 className="my-3">Business</h1>
            {
                paginatedBusiness.length === 0 ? <p>Businesses are coming</p> :
                    <Row>
                        {paginatedBusiness.map((busi) => {
                            if (busi.isApproved === false) return null;
                            return (<Col key={busi.uid} sm={12} md={6} lg={4} xl={3}>
                                <Business busi={busi} />
                            </Col>)
                        })}
                    </Row>
            }
            <div>
                <Pagination size="sm">{businessItems}</Pagination>
            </div>

        </>
    )
}
const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    businesses: state.businesses.businesses
})
export default connect(mapStateToProps)(SearchScreen)

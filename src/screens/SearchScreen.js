import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Category from '../components/Category'
import Business from '../components/Business'
import Loader from '../components/Loader'

const SearchScreen = ({ match, categories, businesses }) => {
    const [search, setSearch] = useState(undefined)
    const [filteredCategory, setFilteredCategory] = useState(undefined)
    const [filteredBusiness, setFilteredBusiness] = useState(undefined)

    useEffect(() => {
        setSearch(match.params.id.toLowerCase())
        const temp = categories.filter((cat) => cat.name.toLowerCase().includes(search) === true || cat.description.toLowerCase().includes(search) === true)
        setFilteredCategory(temp)

        const temp2 = businesses.filter((bus) => bus.name.toLowerCase().includes(search) === true
            || bus.description.toLowerCase().includes(search) === true
            || bus.products.toLowerCase().includes(search) === true)
        setFilteredBusiness(temp2);


        // console.log("Hello" + categories)
    }, [categories, businesses, match, search])


    // useEffect(() => {


    // }, [categories])
    if (filteredCategory === undefined || match.params.id === undefined || filteredBusiness === undefined) return <Loader />;
    return (
        <>
            {/* {console.log(match.params.id)} */}
            <h1>Categories</h1>
            {/* {console.log(filteredCategory)} */}
            <Row className="text-right">
                {filteredCategory.map((category) => {
                    return (
                        <Col key={category.uid} sm={12} md={6} lg={4} xl={3}>
                            <Category key={category.uid} category={category} />
                        </Col>
                    )
                })}
            </Row>


            <h1 className="my-3">Business</h1>
            {
                filteredBusiness.length === 0 ? <p>Businesses are coming</p> :
                    <Row>
                        {filteredBusiness.map((busi) => {
                            if (busi.isApproved === false) return null;
                            return (<Col key={busi.uid} sm={12} md={6} lg={4} xl={3}>
                                <Business busi={busi} />
                            </Col>)
                        })}
                    </Row>
            }

        </>
    )
}
const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    businesses: state.businesses.businesses
})
export default connect(mapStateToProps)(SearchScreen)

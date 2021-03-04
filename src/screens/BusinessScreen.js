import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Form, Button } from 'react-bootstrap'
import Business from '../components/Business'
import { connect } from 'react-redux'
import Loader from '../components/Loader'
const BusinessScreen = ({ match, categories, businesses }) => {
    const [business, setBusiness] = useState(undefined);
    const [category, setCategory] = useState(undefined);
    const [filteredBusiness, setFilteredBusiness] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(()=>{
        setCategory( categories.find((p) => p.name === match.params.category));
    },[categories,setCategory, match])
    useEffect(() => {
        const temp = businesses.filter((p) => p.category === match.params.category);
        console.log(temp)
        setFilteredBusiness(temp);
    }, [setBusiness, businesses, match, setFilteredBusiness, business]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(search === ''){
            setFilteredBusiness(businesses.filter((p) => p.category === match.params.category));
            return;
        }
        setSearch(search.toLowerCase());
        const temp = filteredBusiness.filter((bus) => bus.name.toLowerCase().includes(search) === true 
                        || bus.description.toLowerCase().includes(search)===true
                        || bus.products.toLowerCase().includes(search)===true)
        setFilteredBusiness(temp);
    }

    if(filteredBusiness === undefined || category === undefined)return <Loader/>;
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
          </Link>
            <Row>
                <Col md={6}>
                    <Image src={category?.image} alt={category.name} fluid />
                </Col>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{category.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>{category.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <Form onSubmit={submitHandler} inline className="my-3">
                <Form.Control
                    type='text'
                    name='q'
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search Businesses'
                    className='mr-sm-2 ml-sm-5'
                ></Form.Control>
                <Button type='submit' variant='outline-success' className='p-2'>
                    Search
                 </Button>
            </Form>
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
export default connect(mapStateToProps)(BusinessScreen);

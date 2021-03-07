import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Pagination} from 'react-bootstrap'
import Business from '../components/Business'
import { connect } from 'react-redux'
import Loader from '../components/Loader'

const perPageMax = 8;

const BusinessScreen = ({ match, categories, businesses }) => {
    const [categoryWiseBusinesses, setCategoryWiseBusinesses] = useState([]);
    const [category, setCategory] = useState(undefined);
    const [filteredBusiness, setFilteredBusiness] = useState([]);
    const [active, setActive] = useState(1);
    useEffect(()=>{
        setCategory( categories.find((p) => p.name === match.params.category));
    },[categories,setCategory, match])
    useEffect(() => {
        const temp = businesses.filter((p) => p.category === match.params.category);
        setCategoryWiseBusinesses(temp);
    }, [businesses, match, setCategoryWiseBusinesses]);
    useEffect(() => {
        let index = active;
        index--;
        let temp = [];
        for(let i=index*perPageMax;i<index*perPageMax+perPageMax && i<categoryWiseBusinesses.length;i++){
            temp.push(categoryWiseBusinesses[i]);
        }
        console.log(temp)
        setFilteredBusiness(temp);
    }, [categoryWiseBusinesses, setFilteredBusiness, active])
    const paginate = (e) => {
        e.preventDefault();
        let index = Number(e.target.innerText);
        if(isNaN(index))return;
        setActive(index);
    }

    if(filteredBusiness === undefined || category === undefined || categoryWiseBusinesses === undefined)return <Loader/>;
    let items = [];
    for (let number = 1; number <= Math.ceil(categoryWiseBusinesses.length/perPageMax); number++) {
        items.push(
            <Pagination.Item key={number} onClick={paginate} active={number === active}>
            {number}
            </Pagination.Item>,
        );
    }
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
            <h1 className="my-3">Business</h1>
            {
                filteredBusiness.length === 0 ? <p>Businesses are coming</p> :
                <>
                    <Row>
                        {filteredBusiness.map((busi) => {
                            if (busi.isApproved === false) return null;
                            return (<Col key={busi.uid} sm={12} md={6} lg={4} xl={3}>
                                <Business busi={busi} />
                            </Col>)
                        })}
                    </Row>
                    <div>
                    <Pagination size="sm">{items}</Pagination>
                    </div>
                    </>
            }

        </>
    )
}
const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    businesses: state.businesses.businesses
})
export default connect(mapStateToProps)(BusinessScreen);

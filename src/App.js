import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import BusinessScreen from './screens/BusinessScreen'
import BusinessDetailsScreen from './screens/BusinessDetailsScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { fetchCategories } from './redux/firestore/categories/categories.actions'
import { fetchBusinesses } from './redux/firestore/businesses/businesses.actions' 

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBusinesses())
  }, [dispatch])
  return (

    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/business/:categoryUid' component={BusinessScreen} />
          <Route path='/businessdetails/:businessUid' component={BusinessDetailsScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}
export default App;


import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import BusinessScreen from './screens/BusinessScreen'
import BusinessDetailsScreen from './screens/BusinessDetailsScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import UserAddScreen from './screens/UserAddScreen'
import UserCategoryScreen from './screens/UserCategoryScreen'
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
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/user/addbusiness' component={UserAddScreen} />
          <Route path='/admin/user/addcategory' component={UserCategoryScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}
export default App;


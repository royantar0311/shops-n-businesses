import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import BusinessScreen from './screens/BusinessScreen'
import BusinessDetailsScreen from './screens/BusinessDetailsScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'


const App = () => {
  return (

    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/business/:id' component={BusinessScreen} />
          <Route path='/businessdetails/:id' component={BusinessDetailsScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App


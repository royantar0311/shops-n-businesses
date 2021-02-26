import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import BusinessScreen from './screens/BusinessScreen'
import BusinessDetailsScreen from './screens/BusinessDetailsScreen'
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
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App


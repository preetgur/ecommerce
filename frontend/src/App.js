import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen' 
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';


function App() {
  return (


    <div>
      <Router>
        <Switch>
          

        {/* <Route path="/product/:id"  component={ProductScreen} exact /> */}
         
          <Route path="/product/:id">
            <Header />
            <ProductScreen />
        
          </Route>
          
          <Route path="/cart/:id?"> 
          {/* optional id */}
            <Header />
            <CartScreen />

          </Route>
  
        <Route path="/login">
          <Header /> 
          <LoginScreen />

          </Route>

          <Route path="/profile">
            <Header />
            <ProfileScreen />
          </Route>
          
          <Route path="/register">
            <Header />
            <RegisterScreen />

          </Route>
          
        <Route path="/">
          <Header />
          <HomeScreen />
          <Footer />
        </Route>
    

        </Switch>

      </Router>

    </div>

  );
}

export default App;

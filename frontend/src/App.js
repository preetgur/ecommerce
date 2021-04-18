import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen' 
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';


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

          <Route path="/order/:id">
            <Header />
            <OrderScreen />
          </Route>
  
        <Route path="/login">
          <Header /> 
          <LoginScreen />

          </Route>
          <Route path="/admin/userlist">
          <Header /> 
            <UserListScreen />
            
          </Route>


          <Route path="/admin/user/:id">
            <Header />
            <UserEditScreen />

          </Route>

          <Route path="/admin/productlist">
            <Header />
            <ProductListScreen />

          </Route>

          <Route path="/admin/product/:id">
            <Header />
            <ProductEditScreen />

          </Route>

          <Route path="/shipping">
            <Header />
            <ShippingScreen />

          </Route>

          <Route path="/palceOrder">
            <Header />
            <PlaceOrderScreen />

          </Route>
          <Route path="/payment">
            <Header />
            <PaymentScreen />

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

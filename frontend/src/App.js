import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen' 
import ProductScreen from './screens/ProductScreen';


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

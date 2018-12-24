import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import UserInfo from './components/UserInfo/UserInfo'
import CreateListing from './components/CreateListing/CreateListing'
import CompanyListings from './components/CompanyListings/CompanyListings'
class Routes extends Component {
    render() {
      return (
        <div>
        <Switch>
  <Route exact path='/login' component={Login}/>
  <Route exact path='/signup' component={SignUp}/>
  <Route exact path='/create/listing' component={CreateListing}/>
  <Route exact path='/company/listings' component={CompanyListings}/>
  <Route exact path='/information' component={UserInfo}/>
        </Switch>
        </div>
      );
    }
  }
  
  export default Routes;
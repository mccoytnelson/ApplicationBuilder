import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import AllListings from './components/AllListings/AllListings'
import UserInfo from './components/UserInfo/UserInfo'
import CreateListing from './components/CreateListing/CreateListing'
import RenderListing from './components/RenderListing//RenderListing'
import CompanyListings from './components/CompanyListings/CompanyListings'
import YourApplications from './components/YourApplications/YourApplications'
class Routes extends Component {
    render() {
      return (
        <div>
        <Switch>
  <Route exact path='/login' component={Login}/>
  <Route exact path='/signup' component={SignUp}/>
  <Route exact path='/create/listing' component={CreateListing}/>
  <Route path='/company/listings/:id' component={CompanyListings}/>
  <Route exact path='/information' component={UserInfo}/>
  <Route exact path='/listings' component={AllListings}/>
  <Route path='/listings/apply/:id' component={RenderListing}/>
  <Route path='/applications/:id' component={YourApplications}/>

        </Switch>
        </div>
      );
    }
  }
  
  export default Routes;
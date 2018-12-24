import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {uploadData} from '../../ducks/reducer'
import { connect } from 'react-redux';
class Login extends Component {
  constructor() {
    super()
    this.state = {
      
    }
    this.login = this.login.bind(this);
  }
  async login() {
    let {email,password} = this.state;
    let res = await axios.post('/auth/login', {email,password});
    this.props.uploadData(res.data);
  }
  render() {
    return (
      <div>
        <h2>
            APPLICATION BUILDER
        </h2>
        <p>Email: <input onChange={(e) => { this.setState({ email: e.target.value }) }} type="text" /></p>
        <p>Password:<input onChange={(e) => { this.setState({ password: e.target.value }) }} type="text" /></p>
        <Link to='/'><button onClick={this.login}>Login</button></Link>
        <Link to='/signup'><button>Signup</button></Link>
        <Link to='/'> <button>Cancel</button></Link>
        <hr />
      </div>
    );
  }
}
function mapStateToProps(state){
  return {...state}
}
export default connect(mapStateToProps,{uploadData})(Login)

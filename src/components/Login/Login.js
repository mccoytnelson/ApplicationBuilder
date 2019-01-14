import React, { Component } from 'react';
import axios from 'axios'
import { Link,Redirect } from 'react-router-dom'
import { uploadData } from '../../ducks/reducer'
import { connect } from 'react-redux';
import './Login.css'
class Login extends Component {
  constructor() {
    super()
    this.state = {
      render: false
    }
    this.login = this.login.bind(this);
  }
  async login() {
    let { email, password } = this.state;
    let noe
    let res = await axios.post('/auth/login', { email, password });
    this.props.uploadData(res.data);
    if(res.data){
      this.setState({render: <Redirect to='/listings'/>}) 
    }
    return noe
  }
  reset = async () => {
    await axios.get('/auth/reset',
      console.log('database purged')
    )
  }
  render() {
    if(this.state.render){return this.state.render}
    return (
      <div className='loginHolder'>
        <div className='innerLogin'>
          <h2 className='loginTitle'>
            APPLICATION BUILDER
        </h2>
          <p className='loginText'>Email</p>
          <input placeholder='Email...' onChange={(e) => { this.setState({ email: e.target.value }) }} type="text" />
          <p className='loginText'>Password</p>
          <input placeholder='Password...' onChange={(e) => { this.setState({ password: e.target.value }) }} type="password" />
          <div></div>
         <div className='login'><button className='loginButton' onClick={this.login}>Login</button></div>
          <p className='newUser'>New User? <Link to='/signup'><button className='loginButton'>Signup</button></Link></p>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { ...state }
}
export default connect(mapStateToProps, { uploadData })(Login)

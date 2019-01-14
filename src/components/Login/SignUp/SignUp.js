import React, { Component } from 'react';
import axios from 'axios'
import {uploadData} from '../../../ducks/reducer'
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom'
import './SignUp.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {
    checked:false,
    redirecter: false
    }
    this.signUp = this.signUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  async signUp() {
    if(this.state.name && this.state.email && this.state.password){
      let { email, password,name,phone,address,resume,portfolio,url,companyName,companyAddress,summary,companyPhone, companyUrl } = this.state;
      let res = await axios.post('/auth/signup', { email, password, name, phone,address,resume,portfolio,url,companyName,companyAddress,summary,companyPhone,companyUrl })
      this.props.uploadData(res.data);
        this.setState({redirecter: <Redirect to='/listings'/>})
    } else { alert('You need at least Name,Email,Password')}
  }
  handleChange() {
    this.setState({
      checked: !this.state.checked
    })
  }
  render() {
    if(this.state.redirecter){return this.state.redirecter}
    // console.log(this.props.match)
    const {checked} = this.state
    const hidden = this.state.checked ? 'notHidden' : 'hidden';
    return (
      <>
        <h2>
            Register for Application Builder
        </h2>
        <div>
        <p>If you plan on uploading applications you need to register with a company account</p>
        <p>Company Account: <input type='checkbox' className='checkbox' checked={checked} onChange={this.handleChange}/></p>
        </div>
      <div className='signup'>
        <div className='signupPhone'>
        <p>Email: <input onChange={(e) => { this.setState({ email: e.target.value }) }} type="text" /></p>
        <p>Password:<input onChange={(e) => { this.setState({ password: e.target.value }) }} type="password" /></p>
        <p>Name:<input onChange={(e) => { this.setState({ name: e.target.value }) }} type="text" /></p>
        <p>Phone Number:<input onChange={(e) => { this.setState({ phone: e.target.value }) }} type="text" /></p>
        <p>Address:<input onChange={(e) => { this.setState({ address: e.target.value }) }} type="text" /></p>
        <p>Resume Link:<input onChange={(e) => { this.setState({ resume: e.target.value }) }} type="text" /></p>
        <p>Portfolio Link:<input onChange={(e) => { this.setState({ portfolio: e.target.value }) }} type="text" /></p>
        <p>Account Picture URL:<input onChange={(e) => { this.setState({ url: e.target.value }) }} type="text" /></p>
        
        </div>
        <div>
        <div className={hidden}>
        <p>Company Name:<input onChange={(e) => { this.setState({ companyName: e.target.value }) }} type="text" /></p>
        <p>Company Summary:<input onChange={(e) => { this.setState({ summary: e.target.value }) }} type="text" /></p>
        <p>Company Adderss:<input onChange={(e) => { this.setState({ companyAddress: e.target.value }) }} type="text" /></p>
        <p>Company Phone Number:<input onChange={(e) => { this.setState({ companyPhone: e.target.value }) }} type="text" /></p>
        <p>Company Logo URL:<input onChange={(e) => { this.setState({ companyUrl: e.target.value }) }} type="text" /></p>
        </div>
        </div>
        {/* <button onClick={()=>{console.log(this.state)}}>log State</button> */}
      </div>
      <div className='signupButtons'>
       <Link to='/'> <button className='signupButton'>Cancel</button></Link>
       <div > <button className='signupButton'onClick={this.signUp}>Signup</button></div>
       </div>
      </>
    );
  }
}
function mapStateToProps(state){
  return {...state}
}
export default connect(mapStateToProps,{uploadData})(Login);

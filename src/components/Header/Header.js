import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './Header.css';
import axios from 'axios'
import {connect} from 'react-redux'
import {wipeAll,uploadData} from '../../ducks/reducer'

class Header extends Component {
    constructor(){
        super()
        this.reset = this.reset.bind(this)
    }
    async componentDidMount(){ 
        let res = await axios.get('/auth/dev');
        this.props.uploadData(res.data);
      }
    async reset(){
        await axios.get('/auth/reset',
        console.log('database purged')
        )}

    logOut = async ()=>{
        await axios.get('/auth/logout');
        this.props.wipeAll();
      };
    render(){
        let ifUser;
        let ifLogged;
        let ifCompany;
       if(this.props.name){
             ifUser = (<div className='logBarDiv'><div to='/company/listings' className='button'>Welcome {this.props.name}</div></div>)
             ifLogged = ( <div className='logBarDiv' ><Link onClick={this.logOut} to='/login' className='button'>Logout</Link></div>)
            } else {
            ifLogged = (<div className='logBarDiv'><Link to='/login' className='button'>Login</Link></div>)
            }
        if(this.props.companyName){
            ifCompany = (<div className='logBarDiv'><Link to={`/company/listings/${this.props.id}`} className='button'>COMPANY LISTINGS</Link></div>)
        }
        return(
            <div className='logBar'>
            <div id='fancyTitle' >APPLICATION BUILDER</div>
            <div className='circle'>
            <img className='circle' src='https://i.pinimg.com/236x/71/0c/72/710c72c8b66468a397777fcc90f71c30--serif-logo-logo-m.jpg' alt='Set your information'/>
            </div>
            {ifLogged}
            <div className='logBarDiv'><Link to='/information' className='button'>YOUR INFORMATION</Link></div>
            <div className='logBarDiv'><Link to='/listings' className='button'>ALL LISTINGS</Link></div>
            <div className='logBarDiv'><Link to={`/applications/${this.props.id}`} className='button'>YOUR APPLICATIONS</Link></div>
            {ifCompany}
            {ifUser}
            
            </div>
        )
    }
}

function mapStateToProps(state){
    return {...state}
}
export default connect(mapStateToProps,{wipeAll,uploadData})(Header)
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import axios from 'axios'
import { connect } from 'react-redux'
import { wipeAll, uploadData } from '../../ducks/reducer'

class Header extends Component {
    async componentDidMount() {
        let res = await axios.get('/auth/dev');
        this.props.uploadData(res.data);
    }
    pleaseLogin=()=>{
        alert('Please log in')
    }
    logOut = async () => {
        await axios.get('/auth/logout');
        this.props.wipeAll();
    };
    render() {
        let ifLogged;
        let ifCompany;
        let ifUser;
        let ifAccount
        let ifInformation
        if (this.props.name) {
            ifUser = (<div id='welcomeLogBarDiv'><div to='/company/listings' id='welcome'>Welcome {this.props.name}</div></div>)
            ifLogged = (<div className='logBarDiv' ><Link onClick={this.logOut} to='/login' className='button'>Logout</Link></div>)
            ifAccount = (<div className='logBarDiv'><Link to={`/applications/${this.props.id}`} className='button'>Your Applications</Link></div>)
            ifInformation = (<div className='logBarDiv'><Link to='/information' className='button'>Your Information</Link></div>)
        } else {
            ifLogged = (<div className='logBarDiv'><Link to='/login' className='button'>Login</Link></div>)
            ifAccount = (<div className='logBarDiv'><Link to={`/`} onClick={this.pleaseLogin} className='button'>Your Applications</Link></div>)
            ifInformation =(<div className='logBarDiv'><Link to='/' onClick={this.pleaseLogin} className='button'>Your Information</Link></div>)
        }
        if (this.props.companyName) {
            ifCompany = (<div className='logBarDiv'><Link to={`/company/listings/${this.props.id}`} className='button'>Company Listings</Link></div>)
        }
        return (
            <div className='logBar'>
                <div id='fancyTitle' >APPLICATION BUILDER</div>
                {/* <div className='circle'>
                    <img className='circle' src='https://i.pinimg.com/236x/71/0c/72/710c72c8b66468a397777fcc90f71c30--serif-logo-logo-m.jpg' alt='Set your information' />
                </div> */}
                {ifLogged}
                <div className='logBarDiv'><Link to='/listings' className='button'>All Listings</Link></div>
                {ifAccount}
                {ifCompany}
                {ifInformation}
                {ifUser}
            </div>
        
        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps, { wipeAll, uploadData })(Header)
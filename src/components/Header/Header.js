import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { wipeAll, uploadData } from '../../ducks/reducer'

class Header extends Component {
    async componentDidMount() {
        let res = await axios.get('/auth/dev');
        this.props.uploadData(res.data);
    }
    pleaseLogin = () => {
        alert('Please log in')
    }
    logOut = async () => {
        await axios.get('/auth/logout');
        this.props.wipeAll();
    };
    render() {
        console.log(this.props.location.pathname)
        let {pathname} = this.props.location
        let ifLogged, ifCompany, ifUser, ifAccount, ifInformation,hovLogged,hovYourApp,hovInfo,hovCompany,hovAll
        if(pathname == '/login'){hovLogged = 'on';}
        else if(pathname === '/'){hovLogged = 'on'}
        else if(pathname.includes('/information')){hovInfo = 'on'}
        else if(pathname.includes( `/company` || '/create')){hovCompany = 'on'}
        else if (pathname.includes('/create')){{hovCompany = 'on'}}
        else if (pathname.includes('status')){{hovCompany = 'on'}}
        else if(pathname.includes(`applications`)){hovYourApp = 'on'}
        else if(pathname ==='/listings' || `/listings/apply/${this.props.match.params}`){hovAll = 'on'}
        else{hovAll = null; hovYourApp = null; hovCompany = null; hovInfo = null}
        if (this.props.name) {
            ifUser = (<div id='welcomeLogBarDiv'><div to='/company/listings' id='welcome'>Welcome {this.props.name}</div></div>)
            ifLogged = (<div className='logBarDiv' ><Link onClick={this.logOut} to='/login' className='button' id={hovLogged}>Logout</Link></div>)
            ifAccount = (<div className='logBarDiv'><Link to={`/applications/${this.props.id}`} className='button' id={hovYourApp}>Your Applications</Link></div>)
            ifInformation = (<div className='logBarDiv'><Link to='/information' className='button' id={hovInfo}>Your Information</Link></div>)
        } else {
        ifLogged = (<div className='logBarDiv'><Link to='/login' className='button' id={hovLogged}>Login</Link></div>)
            ifAccount = (<div className='logBarDiv'><Link to={`/`} onClick={this.pleaseLogin} className='button' id={hovYourApp}>Your Applications</Link></div>)
            ifInformation = (<div className='logBarDiv'><Link to='/' onClick={this.pleaseLogin} className='button' id={hovInfo}>Your Information</Link></div>)
        }
        if (this.props.companyName) {
            ifCompany = (<div className='logBarDiv'><Link to={`/company/listings/${this.props.id}`} className='button' id={hovCompany}>Company Listings</Link></div>)
        }
        return (
            <div className='logBar'>
                <div id='fancyTitle' >APPLICATION BUILDER</div>
                {/* <div className='circle'>
                    <img className='circle' src='https://i.pinimg.com/236x/71/0c/72/710c72c8b66468a397777fcc90f71c30--serif-logo-logo-m.jpg' alt='Set your information' />
                </div> */}
                {ifLogged}
                <div className='logBarDiv'><Link to='/listings' className='button' id={hovAll}>All Listings</Link></div>
                {ifAccount}
                {ifCompany}
                {ifInformation}
                {ifUser}
                {/* <div>{this.props.location}</div> */}
            </div>

        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}
export default withRouter(connect(mapStateToProps, { wipeAll, uploadData })(Header))
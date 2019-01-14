import React, { Component } from 'react';
import './UserInfo.css';
import { connect } from 'react-redux'
import axios from 'axios';
import { uploadData } from '../../ducks/reducer'
class UserInfo extends Component {
    constructor() {
        super()
        this.state = {
            edit: false
        }
    }
    toggleEdit = () => {
        this.setState({
            email: this.props.email,
            name: this.props.name,
            phoneNumber: this.props.phoneNumber,
            address: this.props.address,
            resume: this.props.resume,
            portfolio: this.props.portfolio,
            url: this.props.url,
            companyName: this.props.companyName,
            companyAddress: this.props.companyAddress,
            companySummary: this.props.companySummary,
            companyPhone: this.props.companyPhone,
            logo: this.props.logo,
            edit: !this.state.edit
        })
    }
    submitEdit = async () => {
        let { email, name, phoneNumber, address, resume, portfolio, url, companyName, companyAddress, companySummary, companyPhone, logo } = this.state;
        let res = await axios.put(`/edit/userinformation/${this.props.id}`, { email, name, phoneNumber, address, resume, portfolio, url, companyName, companyAddress, companySummary, companyPhone, logo });
        this.props.uploadData(res.data);
        this.setState({ edit: !this.state.edit })
    }
    render() {
        if (!this.state.edit) {
            let companyTrue
            if (this.props.companyName) {
                companyTrue = (<div>
                    <div className='R'>Company Name: {this.props.companyName}</div>
                    <div className='R'>  Company Summary: {this.props.companySummary}</div>
                    <div className='R'>Company Address: {this.props.companyAddress}</div>
                    <div className='R'>Company Phone Number: {this.props.companyPhone}</div>
                    <div className='R'>Company Logo URL: {this.props.logo}</div>
                </div>)
            } else {
                companyTrue = (<div>Standard Account</div>)
            }
            return (
                <>
                    <div className='userInfo'>
                        <div className='userInfoTitle'>Your Information</div>
                        <div>
                            <div className='R'>Name: {this.props.name}</div>
                            <div className='R'>Email: {this.props.email}</div>
                            <div className='R'>Address: {this.props.address}</div>
                            <div className='R'>Phone Number: {this.props.phoneNumber}</div>
                            <div className='R'>Resume Link: {this.props.resume}</div>
                            <div className='R'>Portfolio Link: {this.props.portfolio}</div>
                            <div className='R'>Profile Picture Link: {this.props.url}</div>
                            {companyTrue}
                        </div>
                    </div>
                    <button className='infoButton' onClick={this.toggleEdit}>Edit Information</button>
                </>

            )

        } else {
            let companyTrue
            if (this.props.companyName) {
                companyTrue = (<div>
                    <div className='R'>Company Name: {this.props.companyName}</div>
                    <input  className='chr'onChange={(e) => { this.setState({ companyName: e.target.value }) }} />
                    <div className='R'>Company Summary: {this.props.companySummary}</div>
                    <textarea  className='chr'onChange={(e) => { this.setState({ companySummary: e.target.value }) }} />
                    <div className='R'>Company Address: {this.props.companyAddress}</div>
                    <input className='chr' onChange={(e) => { this.setState({ companyAddress: e.target.value }) }} />
                    <div className='R'>Company Phone Number: {this.props.companyPhone}</div>
                    <input  className='chr'onChange={(e) => { this.setState({ companyPhone: e.target.value }) }} />
                    <div className='R'>Company Logo URL: {this.props.logo}</div>
                    <input  className='chr'onChange={(e) => { this.setState({ logo: e.target.value }) }} />
                </div>)
            } else {
                companyTrue = (<div>Standard Account</div>)
            }
            return (
                <>
                    <div className='userInfo'>
                        <div className='userInfoTitle'>Your Information</div>
                        <div>
                            <div className='R'>Name: {this.props.name}</div>

                            <div className='R'>Email: {this.props.email}</div>
                            <input   className='chr'onChange={(e) => { this.setState({ email: e.target.value }) }} />
                            <div className='R'>Address: {this.props.address}</div>
                            <input  className='chr'onChange={(e) => { this.setState({ address: e.target.value }) }} />
                            <div className='R'>Phone Number: {this.props.phoneNumber}</div>
                            <input className='chr' onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }} />
                            <div className='R'>Resume Link: {this.props.resume}</div>
                            <input className='chr' onChange={(e) => { this.setState({ resume: e.target.value }) }} />
                            <div className='R'>Portfolio Link: {this.props.portfolio}</div>
                            <input className='chr' onChange={(e) => { this.setState({ portfolio: e.target.value }) }} />
                            <div className='R'>Profile Picture Link: {this.props.url}</div>
                            <input  className='chr'onChange={(e) => { this.setState({ url: e.target.value }) }} />
                            {companyTrue}
                        </div>
                    </div>
                    <div className='hrl'>
                    <button className='infoButton' onClick={this.submitEdit}>Submit Changes</button>
                    <button className='infoButton' onClick={this.toggleEdit}>Cancel</button>
                    </div>
                </>
            )

        }
    }
}

function mapStateToProps(state) {
    return {
        ...state
    }
}
export default connect(mapStateToProps, { uploadData })(UserInfo)
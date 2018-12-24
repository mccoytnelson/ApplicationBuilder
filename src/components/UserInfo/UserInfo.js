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
        this.setState({ email: this.props.email,
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
            edit: !this.state.edit })
    }
    submitEdit=async ()=>{
        let { email, name, phoneNumber, address, resume, portfolio, url, companyName, companyAddress, companySummary, companyPhone, logo } = this.state;
        let res = await axios.put(`/edit/userinformation/${this.props.id}`, {email, name, phoneNumber, address, resume, portfolio, url, companyName, companyAddress, companySummary, companyPhone, logo});
        this.props.uploadData(res.data);
        this.setState({edit: !this.state.edit})
    }
    render() {
        if (!this.state.edit) {
            let companyTrue
            if (this.props.companyName) {
                companyTrue = (<div>
                    <div>Company Name: {this.props.companyName}</div>
                    <div>Company Summary: {this.props.companySummary}</div>
                    <div>Company Address: {this.props.companyAddress}</div>
                    <div>Company Phone Number: {this.props.companyPhone}</div>
                    <div>Company Logo URL: {this.props.logo}</div>
                </div>)
            } else {
                companyTrue = (<div>Standard Account</div>)
            }
            return (
                <div>
                    <div>User Information</div>
                    <div>Name: {this.props.name}</div>
                    <div>Email: {this.props.email}</div>
                    <div>Address: {this.props.address}</div>
                    <div>Phone Number: {this.props.phoneNumber}</div>
                    <div>Resume Link: {this.props.resume}</div>
                    <div>Portfolio Link: {this.props.portfolio}</div>
                    <div>Profile Picture Link: {this.props.url}</div>
                    {companyTrue}
                    <button onClick={this.toggleEdit}>Edit Information</button>
                </div>

            )

        } else {
            let companyTrue
            if (this.props.companyName) {
                companyTrue = (<div>
                    <div>Company Name: {this.props.companyName}</div><input onChange={(e) => { this.setState({companyName:e.target.value}) }} />
                    <div>Company Summary: {this.props.companySummary}</div><input onChange={(e) => { this.setState({companySummary:e.target.value}) }} />
                    <div>Company Address: {this.props.companyAddress}</div><input onChange={(e) => { this.setState({companyAddress:e.target.value}) }} />
                    <div>Company Phone Number: {this.props.companyPhone}</div><input onChange={(e) => { this.setState({companyPhone:e.target.value}) }} />
                    <div>Company Logo URL: {this.props.logo}</div><input onChange={(e) => { this.setState({logo:e.target.value}) }} />
                </div>)
            } else {
                companyTrue = (<div>Standard Account</div>)
            }
            return (
                <div>
                    <div>User Information</div>
                    <div>Name: {this.props.name}</div><input onChange={(e) => { this.setState({name:e.target.value}) }} />
                    <div>Email: {this.props.email}</div><input onChange={(e) => { this.setState({email:e.target.value}) }} />
                    <div>Address: {this.props.address}</div><input onChange={(e) => { this.setState({address:e.target.value}) }} />
                    <div>Phone Number: {this.props.phoneNumber}</div><input onChange={(e) => { this.setState({phoneNumber:e.target.value}) }} />
                    <div>Resume Link: {this.props.resume}</div><input onChange={(e) => { this.setState({resume:e.target.value}) }} />
                    <div>Portfolio Link: {this.props.portfolio}</div><input onChange={(e) => { this.setState({portfolio:e.target.value}) }} />
                    <div>Profile Picture Link: {this.props.url}</div><input onChange={(e) => { this.setState({url:e.target.value}) }} />
                    {companyTrue}
                    <button onClick={this.submitEdit}>Submit Changes</button><button onClick={this.toggleEdit}>Cancel</button>
                </div>

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
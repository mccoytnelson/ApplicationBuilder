import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'
class CompanyCompletedListing extends Component {
    constructor() {
        super()
        this.state = {
            account: {}
        }
    }
    async componentWillMount() {
        let res = await axios.post('/retrieve/account-details', {id: this.props.ids.account_id})
        // let points = await axios.get(`/retrieve/calculate-points/${this.props.ids.listing_id}`)
        this.setState({account: res.data })
        console.log(this.props.ids.account_id,res.data)
    }
    calculateMatch(){
        return 'hi'
    }
   render() {
        let {account} = this.state
        return (
            <div>
                no
                <div>Applicant: {account.name}</div>
                <div>Applicant: {account.email}</div>
                <div>Applicant: {account.phone_number}</div>
                <div>Applicant: {account.address}</div>
                <div>Applicant: {account.timestamp}</div>
                <div>Percentage Match: 3</div>
                <Link to={`/completed-application/${this.props.ids.completed_id}`}><button>See Completed Application</button></Link>
                <hr />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(CompanyCompletedListing);
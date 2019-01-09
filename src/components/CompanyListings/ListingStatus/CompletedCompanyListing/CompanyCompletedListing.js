import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'
class CompanyCompletedListing extends Component {
    constructor() {
        super()
        this.state = {
            account: { timestamp: ''},
            points: {},
            match: 0,
           
        }
    }
    async componentDidMount() {
        let score1 = 0
        let {points} = this.props
        let res = await axios.post('/retrieve/account-details', {id: this.props.ids.account_id})
        let score = await axios.get(`/retrieve/calculate-score/${this.props.ids.completed_id}`)
        this.setState({account: res.data})
        console.log(points.data)
         score.data.map((e)=>{return score1 += parseInt(e.points)})
         this.setState({match: Math.round((score1/points)*100)})
    }
    calculateMatch=()=>{
        console.log(this.state)
    }
   render() {
        let {account} = this.state
        return (
            <div>
                <div>Applicant: {account.name}</div>
                <div>Applicant: {account.email}</div>
                <div>Applicant: {account.phone_number}</div>
                <div>Address: {account.address}</div>
                <div>Applicant: {account.timestamp.slice(0,10)}</div>
                <div>Percentage Match: {this.state.match}%</div>
                <Link to={`/completed-application/${this.props.ids.completed_id}`}><button>See Completed Application</button></Link>
                <button onClick={this.calculateMatch}>calculate</button>
                <hr />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(CompanyCompletedListing);
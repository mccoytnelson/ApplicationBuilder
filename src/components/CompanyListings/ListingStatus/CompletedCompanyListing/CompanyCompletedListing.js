import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'
class CompanyCompletedListing extends Component {
    constructor() {
        super()
        this.state = {
            account: { timestamp: '' },
            points: {},
            match: 0,

        }
    }
    async componentDidMount() {
        let { points } = this.props
        let score = await axios.get(`/retrieve/calculate-score/${this.props.ids.completed_id}`)
        this.setState({ match: Math.round((score.data[0].total / points) * 100) });
        this.props.tick()
    }
    render() {
        let colorChange = 'red'
        if(this.state.match>80){
            colorChange = 'green'
        } else if(this.state.match>50){
            colorChange= 'yellow'
        } else {
            colorChange = 'red'
        }
        let { ids } = this.props
        return (
            <div className='companyComplatedListingHolder'>
                <div className='colorDot' id={colorChange}></div>
                <div>Applicant: {ids.name}</div>
                <div>Email: {ids.email}</div>
                <div>Phone Number: {ids.phone_number}</div>
                <div>Address: {ids.address}</div>
                <div>Applied: {ids.timestamp.slice(0, 10)}</div>
                <div>Percentage Match: {this.state.match}%</div>
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
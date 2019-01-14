import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'
class CompanyCompletedListing extends Component {
    constructor() {
        super()
        this.state = {
            ids: { timestamp: '' },
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
        if (this.state.match > 80) {
            colorChange = 'green'
        } else if (this.state.match > 50) {
            colorChange = 'yellow'
        } else {
            colorChange = 'red'
        }
        let { ids } = this.props
        console.log('info i need', ids)
        if (!this.props.ids) {return  <div>loading</div> }
        else {
            return (
                <div className='innerListing'>
                    <div className='innerInnerListing'>
                        <div className='topInfo'>
                            <div id='topInfoCompany'>{ids.name}</div>
                            <div className='colorDot' id={colorChange}>Percentage Match: {this.state.match}%</div>

                        </div>
                        <div id='positionPos'>
                            <div id='topInfoPosition'>{ids.email}</div>
                        </div>
                        <div className='leftAlign' >
                            <div>   Address: {ids.address}</div>
                            <div>   Phone Number: {ids.phone_number}</div>
                        </div>
                    </div>
                    <div className='listingRightSide'>
                        <div className='timeStamp'>{ids.timestamp.slice(0, 10)}</div>
                        <Link className='applyHolder' to={`/completed-application/${this.props.ids.completed_id}`}><button id='completeListingButton'>Review Application</button></Link>
                    </div>
                </div>

            )
        }
    }
}
{/* <div className='innerInnerListing'>
                <div className='colorDot' id={colorChange}></div>
                <div>Applicant: {ids.name}</div>
                <div>Email: {ids.email}</div>
                <div>Phone Number: {ids.phone_number}</div>
                <div>Address: {ids.address}</div>
                <div>Applied: {ids.timestamp.slice(0, 10)}</div>
                <div>Percentage Match: {this.state.match}%</div>
                <Link to={`/completed-application/${this.props.ids.completed_id}`}><button>See Completed Application</button></Link>
                <hr />
            </div> */}
function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(CompanyCompletedListing);
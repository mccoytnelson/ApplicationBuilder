import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'
class CompanyCompletedListing extends Component {
    constructor() {
        super()
        this.state = {
            points: {},
            match: 0,
            account: { timestamp: '' }

        }
    }
    async componentDidMount() {
        let { points } = this.props
        let score = await axios.get(`/retrieve/calculate-score/${this.props.ids.completed_id}`)
        let account = await axios.post(`/retrieve/account-details`,{id:this.props.ids.account_id})
        this.setState({account:account.data, match: Math.round((score.data[0].total / points) * 100) });
        this.props.tick()
    }
    render() {
        let colorChange = 'red'
        if (this.state.match > 100) {
            colorChange = 'brightGreen'
        }
        else if (this.state.match > 80) {
            colorChange = 'green'
        } else if (this.state.match > 50) {
            colorChange = 'yellow'
        } else {
            colorChange = 'red'
        }
        let { ids } = this.props
        console.log('info i need', ids)
        let {account} = this.state
        if (!this.props.ids) { return <div>loading</div> }
        else {
            return (
                <div className='innerListing'>
                    <div className='innerInnerListing'>
                        <div className='topInfo'>
                            <div id='topInfoCompany'>{account.name}</div>
                            <div className='colorDot' id={colorChange}>Percentage Match: {this.state.match}%</div>

                        </div>
                        <div id='positionPos'>
                            <div id='topInfoPosition'>{account.email}</div>
                        </div>
                        <div className='leftAlign' >
                            <div>   Address: {account.address}</div>
                            <div>   Phone Number: {account.phone_number}</div>
                        </div>
                    </div>
                    <div className='listingRightSide'>
                        <div className='timeStamp'>{account.timestamp.slice(0, 10)}</div>
                        <Link className='applyHolder' to={`/completed-application/${this.props.ids.completed_id}`}><button id='completeListingButton'>Review Application</button></Link>
                    </div>
                </div>

            )
        }
    }
}
function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(CompanyCompletedListing);
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'
import '../YourApplications.css'

class RenderCompletedListing extends Component {
    constructor() {
        super()
        this.state = {
            listing: {},
            upload: false
        }
    }
    async componentWillMount() {
        let res = await axios.get(`/retrieve/listing/${this.props.ids.listing_id}`)
        this.setState({ listing: res.data })
    }
    render() {
        let { listing} = this.props
        let {timestamp} = this.props.ids
        return (
            <div className='innerListing'> 
            <div className='innerInnerListing'>
            <div className='topInfo'> 
                    <div id='topInfoCompany'>{listing.company_name}</div>
                    <div id='topInfoLocation'>{listing.location}</div>
                </div>
                <div id='positionPos'>
                    <div id='topInfoPosition'>{listing.position}</div>
                </div>
                <div className='listingDescription'>Description: {listing.description}</div>
                </div> 
                <div className='listingRightSideYours'>
                    <div className='timeStamp'>{timestamp.slice(0, 10)}</div>
                    <div className='yoursButtons'>
                    <Link className='buttonWrap' to={`/completed-application/${this.props.ids.completed_id}`}><button className='fillAppButtonYours'>See Application</button></Link>
                    <div className='buttonWrap'><button className='fillAppButtonYours' onClick={()=>{this.props.deleteListing(this.props.ids.completed_id)}}>Cancel Application</button></div>
        
                    </div>
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(RenderCompletedListing);
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
                    <div className='topInfoInner'>{listing.position}</div>
                    <div className='topInfoInner'>{listing.location}</div>
                    <div className='topInfoInner'>Company: {listing.company_name}</div>
                </div>
                <div className='listingDescription'>Description: {listing.description}</div>
                </div> 
                <div className='listingRightSide'>
                    <div className='timeStamp'>{timestamp.slice(0, 10)}</div>
                    <Link className='buttonWrap' to={`/completed-application/${this.props.ids.completed_id}`}><button className='completeListingButton'>See Completed Application</button></Link>
                    <div className='buttonWrap'><button className='completeListingButton' onClick={()=>{this.props.deleteListing(this.props.ids.completed_id)}}>Cancel Application</button></div>
        
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(RenderCompletedListing);
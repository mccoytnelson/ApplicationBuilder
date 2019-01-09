import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'
class RenderCompanyListing extends Component {
    constructor() {
        super()
        this.state = {
            listing: {timestamp: ''},
            upload: false,
            
        }
    }
    componentWillMount() {
        this.setState({ listing: this.props.listing })
    }
    render() {
        let { listing } = this.props
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
                    <div className='timeStamp'>{listing.timestamp.slice(0, 10)}</div>
                    <Link className='buttonWrap' to={`/listing-status/${this.props.listing.listing_id}`}><button className='completeListingButton'>Check application status</button></Link>
                    <div className='buttonWrap'><button id='delete' className='completeListingButton' onClick={() => { this.props.deleteListing(this.props.listing.listing_id) }}>Delete Listing</button></div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(RenderCompanyListing);
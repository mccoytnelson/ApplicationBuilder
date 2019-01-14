import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
class RenderCompanyListing extends Component {
    constructor() {
        super()
        this.state = {
            listing: { timestamp: '' },
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
                        <div id='topInfoCompany'>{listing.company_name}</div>
                        <div id='topInfoLocation'>{listing.location}</div>
                    </div>
                    <div id='positionPos'>
                        <div id='topInfoPosition'>{listing.position}</div>
                    </div>
                    <div className='listingDescription'>Description: {listing.description}</div>
                </div>
                <div className='listingRightSideYours'>
                    <div className='timeStamp'>{listing.timestamp.slice(0, 10)}</div>
                    <div>
                    <Link className='buttonWrap' to={`/listing-status/${this.props.listing.listing_id}`}><button className='fillAppButtonYours'>Review Applicants</button></Link>
                    <div className='buttonWrap'><button id='delete' className='fillAppButtonYours' onClick={() => { this.props.deleteListing(this.props.listing.listing_id) }}>Delete Listing</button></div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(RenderCompanyListing);
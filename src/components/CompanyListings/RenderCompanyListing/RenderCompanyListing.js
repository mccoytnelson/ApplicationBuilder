import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'
class RenderCompanyListing extends Component {
    constructor() {
        super()
        this.state = {
            listing: {},
            upload: false,
        }
    }
    async componentWillMount() {
        let res = await axios.get(`/retrieve/listing/${this.props.listing.listing_id}`)
        this.setState({ listing: res.data })
    }
    render() {
        let { listing} = this.state
        return (
            <div>
                <div>Position: {listing.position}</div>
                <div>Location: {listing.location}</div>
                <div>Company Name: {listing.company_name}</div>
                <div>Company Summary: {listing.company_summary}</div>
                <div>Description: {listing.description}</div>
                <Link to={`/listing-status/${this.props.listing.listing_id}`}><button>Check application status</button></Link>
                <button onClick={()=>{this.props.deleteListing(this.props.listing.listing_id)}}>Delete Listing</button>

                <hr />
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(RenderCompanyListing);
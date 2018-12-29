import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './ListingSummary.css'
class Listing extends Component {
    render() {
        let {listing} = this.props
        return (
            <div>
                <div>Position: {listing.position}</div>
                <div>Location: {listing.location}</div>
                <div>Company Name: {listing.company_name}</div>
                <div>Company Summary: {listing.company_summary}</div>
                <div>Description: {listing.description}</div>
                <Link to={`/listings/apply/${listing.listing_id}`}><button>Fill Out Application</button></Link>
                {/* <div>{listing.}</div>
                <div>{listing.}</div>
                <div>{listing.}</div>
                <div>{listing.}</div> */}
            </div>
            )
        }
    }
export default Listing;
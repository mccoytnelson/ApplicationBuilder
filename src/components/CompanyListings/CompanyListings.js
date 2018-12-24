import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Listing from '../Listing/Listing'
import './CompanyListings.css'
class CompanyListings extends Component {
    render() {
        return (
            <div className='center'>
                <div className='CompanyListing' />
                <Link to='/create/listing'><div className='build' /></Link>
                <Listing />
                <Listing />
            </div>
        );
    }
}

export default CompanyListings;
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RenderCompanyListing from './RenderCompanyListing/RenderCompanyListing'
import axios from 'axios'
import './CompanyListings.css'
class CompanyListings extends Component {
    constructor() {
        super()
        this.state = {
            listings: false,
            completed: true,
            refresh: 0
        }
    }
    async componentDidMount() {
        let res = await axios.get(`/retrieve/company-listings/${this.props.match.params.id}`)
        this.setState({ listings: res.data })
    }
    deleteListing= async (id)=>{
        await axios.delete(`/delete/listing/${id}`)
        let res = await axios.get(`/retrieve/company-listings/${this.props.match.params.id}`)
        this.setState({ listings: res.data })
      }
    mapListings() {
        let all = [];
        this.state.listings.map(
            (e) => {
                return all.push(
                    <div key={e.listing_id}>
                        <RenderCompanyListing deleteListing={this.deleteListing} completed={this.state.completed} listing={e} />
                    </div>
                )
            }
        )
        return all
    }
    render() {
        let mapped = (<div>Not Connected To DataBase</div>)
        if (this.state.listings) {
            mapped = this.mapListings()
        }
        return (
            <div className='center'>
                <div className='CompanyListing' />
                <Link className='build' to='/create/listing'>Create New Listing</Link>
                <div>
                    {mapped}
                </div>
            </div>
        );
    }
}

export default CompanyListings;
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RenderCompanyListing from '../RenderCompanyListing/RenderCompanyListing'
import axios from 'axios'
import './CompanyListings.css'
class CompanyListings extends Component {
    constructor() {
        super()
        this.state = {
            listings: false,
            completed: true
        }
    }
    async componentDidMount() {
        let res = await axios.get(`/retrieve/company-listings/${this.props.match.params.id}`)
        console.log(res)
        this.setState({ listings: res.data })
        console.log(this.state.listings)
    }
    mapListings() {
        let all = [];
        console.log(this.state.listings)
        this.state.listings.map(
            (e) => {
                return all.push(
                    <div key={e.listing_id}>
                    <RenderCompanyListing completed={this.state.completed} listing={e} />
                    </div>
                )
            }
        )
        return all
    }
    render() {
        let mapped = (<div>Repopulate your database</div>)
        if (this.state.listings) {
            mapped = this.mapListings()
        }

        return (
            <div className='center'>
                <div className='CompanyListing' />
                <Link to='/create/listing'><div className='build' /></Link>
                <div>
                {mapped}
            </div>
            </div>
        );
    }
}

export default CompanyListings;
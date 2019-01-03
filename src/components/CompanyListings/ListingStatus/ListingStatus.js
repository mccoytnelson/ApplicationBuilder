import React, { Component } from 'react'
import axios from 'axios'
import CompanyCompletedListing from './CompletedCompanyListing/CompanyCompletedListing';


export default class ListingStatus extends Component {
    constructor() {
        super()
        this.state = {
            listings: false,
            completed: true
        }
    }
    async componentWillMount() {
        let res = await axios.get(`/retrieve/company-completed/${this.props.match.params.id}`)
        this.setState({ listings: res.data })
        console.log(this.state)
    }
    mapListings() {
        let all = [];
        all = this.state.listings.map(
            (e) => {
                return (
                    <div key={e.listing_id}>
                    <CompanyCompletedListing listing={e} />
                    </div>
                )
            }
        )
        return all
    }
    render() {
        let mapped = (<div>Repopulate your database</div>)
        if (this.state.listings) {
            console.log(this.state.listings)
            mapped = this.mapListings()
        } else {
            console.log('repopulate your database')
        }

        return (
            <div>
                hi
                {mapped}
            </div>
        )
    }
}
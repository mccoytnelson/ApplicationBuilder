import React, { Component } from 'react'
import './AllListings.css'
import axios from 'axios'
import ListingSummary from '../ListingSummary/ListingSummary'


export default class AllListings extends Component {
    constructor() {
        super()
        this.state = {
            listings: false,
        }
    }
    async componentDidMount() {
        let res = await axios.get('/retrieve/listings')
        this.setState({ listings: res.data })
        console.log(this.state.listings)
    }
    mapListings() {
        let all = [];
        this.state.listings.map(
            (e) => {
                return all.push(
                    <div key={e.listing_id}>
                    <ListingSummary  listing={e} />
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
        } else {
            console.log('repopulate your database')
        }

        return (
            <div>
                {mapped}
            </div>
        )
    }
}
import React, { Component } from 'react'
import axios from 'axios'
import RenderCompletedListing from '../RenderCompletedListing/RenderCompletedListing'


export default class YourApplications extends Component {
    constructor() {
        super()
        this.state = {
            listings: false,
            completed: true
        }
    }
    async componentDidMount() {
        let res = await axios.get(`/retrieve/completed/${this.props.match.params.id}`)
        this.setState({ listings: res.data })
        console.log(this.state.listings)
    }
    mapListings() {
        let all = [];
        this.state.listings.map(
            (e) => {
                return all.push(
                    <div key={e.listing_id}>
                    <RenderCompletedListing completed={this.state.completed} listing={e} />
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
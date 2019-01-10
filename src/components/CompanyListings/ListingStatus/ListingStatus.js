import React, { Component } from 'react'
import axios from 'axios'
import CompanyCompletedListing from './CompletedCompanyListing/CompanyCompletedListing';


export default class ListingStatus extends Component {
    constructor() {
        super()
        this.state = {
            listings: false,
            tick: 0,
            amount: false
        } 
    }
    async componentDidMount() {
        let res = await axios.get(`/retrieve/company-completed/${this.props.match.params.id}`)
        this.setState({ listings: res.data, amount: res.data.length })
    }
    tick = () => {
        this.setState({tick: this.state.tick + 1})
    }
    mapListings() {
        let all = [];
        all = this.state.listings.map(
            (e) => {
                // this.setState({amount: this.state.amount + 1})
                return (
                    // <div key={e.completed_id}>
                    <CompanyCompletedListing key={e.completed_id} tick={this.tick} points={e.sum} ids={e} />
                    // </div>
                )
            }
            )
            return all
        }
    sortByMatch(arr){
        arr.sort((a,b)=>{})
    }
        render() {
            if(this.state.amount === this.state.tick){
                console.log('run')
        }
        let mapped = (<div>Repopulate your database</div>)
        if (this.state.listings) {
            mapped = this.mapListings()
        } else {
            console.log('repopulate your database')
        }
        console.log(mapped[0])
        return (
            <div>
                <button >Alphabetize</button>
                <button >Date</button>
                <button>Percentage Match</button>
                <p>Custom Search</p>
                <input /><button>Search</button>
                {mapped}
            </div>
        )
    }
}
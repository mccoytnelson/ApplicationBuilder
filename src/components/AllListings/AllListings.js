import React, { Component } from 'react'
import './AllListings.css'
import axios from 'axios'
import ListingSummary from './ListingSummary/ListingSummary'


export default class AllListings extends Component {
    constructor() {
        super()
        this.state = {
            listings: false,
            search: ''
        }
    }
    async componentDidMount() {
        let res = await axios.get('/retrieve/listings')
        this.setState({ listings: res.data })
    }
    mapListings() {
        let all = [];
        this.state.listings.map(
            (e) => {
                return all.push(
                    <div className='listingHolder' key={e.listing_id}>
                    <ListingSummary  listing={e} />
                    </div>
                )
            }
        )
        return all
    } 
    newest = async ()=>{
        let res = await axios.get('/retrieve/newest')
        this.setState({ listings: res.data })
    }
    oldest = async ()=>{
        let res = await axios.get('/retrieve/oldest')
        this.setState({ listings: res.data })
    }
    alphabetize = async ()=>{
        let res = await axios.get('/retrieve/alphabatize-all-listings')
        this.setState({ listings: res.data })
    }
    dealphabetize = async ()=>{
        let res = await axios.get('/retrieve/dealphabatize-all-listings')
        this.setState({ listings: res.data })
    }
    customInput = async ()=>{
        let res = await axios.post('/retrieve/custom-search',{search: this.state.search})
        console.log(this.state.search,res.data)
        this.setState({ listings: res.data })
    }
    deleteListing= async (id)=>{
        axios.delete(`/delete/application/${id}`)
        let res = await axios.get(`/retrieve/applications`)
        this.setState({ listings: res.data })
      }
    render() {
        let mapped = (<div>Not Connected To DataBase</div>)
        if (this.state.listings) {
            mapped = this.mapListings()
            return (
                <>
                    <div className='searchBar'>
                    <button className='searchButton' id='searchInputButton' onClick={this.customInput}>Search</button>
                    <input className='searchInput' placeholder='Search...' onChange={(e)=>this.setState({search:e.target.value })} />
                    <button className='searchButton' onClick={this.alphabetize}>A-Z</button>
                    <button className='searchButton' onClick={this.dealphabetize}>Z-A</button>
                    <button className='searchButton' onClick={this.newest}>Newest</button>
                    <button className='searchButton' onClick={this.oldest}>Oldest</button>
                    </div>
                    <div className='allListings'>
                    {mapped}
                    </div>
                </>
            )
        } else {
           return <div>Loading</div>
        }
        
    }
}
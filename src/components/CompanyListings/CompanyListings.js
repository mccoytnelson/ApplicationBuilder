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
                    <div className='listingHolderCompany' key={e.listing_id}>
                        <RenderCompanyListing deleteListing={this.deleteListing} completed={this.state.completed} listing={e} />
                    </div>
                )
            }
        )
        return all
    }
    newest = async ()=>{
        let res = await axios.get(`/retrieve/newest-company-listings/${this.props.match.params.id}`)
        this.setState({ listings: res.data })
    }
    oldest = async ()=>{
        let res = await axios.get(`/retrieve/oldest-company-listings/${this.props.match.params.id}`)
        this.setState({ listings: res.data })
    }
    alphabetize = async ()=>{
        let res = await axios.get(`/retrieve/alphabatize-company-listings/${this.props.match.params.id}`)
        this.setState({ listings: res.data })
    }
    dealphabetize = async ()=>{
        let res = await axios.get(`/retrieve/dealphabatize-company-listings/${this.props.match.params.id}`)
        this.setState({ listings: res.data })
    }
    customInput = async ()=>{
        let res = await axios.post(`/retrieve/custom-search-company-listings/${this.props.match.params.id}`,{search: this.state.search})
        console.log(this.state.search,res.data)
        this.setState({ listings: res.data })
    }
    render() {
        let mapped = [(<div>Not Connected To DataBase</div>)]
        if (this.state.listings) {
            mapped = this.mapListings()
        }
        let whichClass
        if(mapped.length<8){
            whichClass = 'lessThan8'
        } else {
            whichClass = 'allListings'
        }
        return (
            <>
                <Link className='build' to='/create/listing'>Click Here Create New Listing</Link>
                <div className='searchBar'>
                    <button className='searchButton' id='searchInputButton' onClick={this.customInput}>Search</button>
                    <input className='searchInput' placeholder='Search...' onChange={(e)=>this.setState({search:e.target.value })} />
                    <button className='searchButton' onClick={this.alphabetize}>A-Z</button>
                    <button className='searchButton' onClick={this.dealphabetize}>Z-A</button>
                    <button className='searchButton' onClick={this.newest}>Newest</button>
                    <button className='searchButton' onClick={this.oldest}>Oldest</button>
                    </div>
                <hr/>
                <div className={whichClass}>
                    {mapped}
                </div>
            </>
        );
    }
}

export default CompanyListings;
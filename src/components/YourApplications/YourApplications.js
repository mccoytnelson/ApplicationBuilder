import React, { Component } from 'react'
import axios from 'axios'
import RenderCompletedListing from './RenderCompletedListing/RenderCompletedListing';
import './YourApplications.css'

export default class YourApplications extends Component {
    constructor() {
        super()
        this.state = {
            listings: false,
            completed: true,
            search: ''
        }
    }
    async componentDidMount() {
        let res = await axios.get(`/retrieve/applications/${this.props.match.params.id}`)
        this.setState({ listings: res.data })
        console.log('rea',res.data)
    }
    mapListings() {
        let all = [];
        this.state.listings.map(
            (e) => {
                return all.push(
                    <div className='listingHolder' key={e.completed_id}>
                    <RenderCompletedListing deleteListing={this.deleteListing} listing={e} ids={e}/>
                    </div>
                )
            }
        )
        return all
    }
    newest = async ()=>{
        let res = await axios.get(`/retrieve/newest-user-listings/${this.props.match.params.id}`)
        this.setState({ listings: res.data })
    }
    oldest = async ()=>{
        let res = await axios.get(`/retrieve/oldest-user-listings/${this.props.match.params.id}`)
        this.setState({ listings: res.data })
    }
    alphabetize = async ()=>{
        let res = await axios.get(`/retrieve/alphabatize-user-listings/${this.props.match.params.id}`)
        this.setState({ listings: res.data })
    }
    dealphabetize = async ()=>{
        let res = await axios.get(`/retrieve/dealphabatize-user-listings/${this.props.match.params.id}`)
        this.setState({ listings: res.data })
    }
    customInput = async ()=>{
        let res = await axios.post(`/retrieve/custom-search-user-listings/${this.props.match.params.id}`,{search: this.state.search})
        this.setState({ listings: res.data })
    }
    deleteListing= async (id)=>{
        axios.delete(`/delete/application/${id}`)
        let res = await axios.get(`/retrieve/applications/${this.props.match.params.id}`)
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
                    <hr/>
                    {mapped}
                </>
            )
        } else {
           return <div>Loading</div>
        }
        
    }
}
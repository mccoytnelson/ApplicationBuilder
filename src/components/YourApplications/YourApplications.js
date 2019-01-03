import React, { Component } from 'react'
import axios from 'axios'
import RenderCompletedListing from './RenderCompletedListing/RenderCompletedListing';


export default class YourApplications extends Component {
    constructor() {
        super()
        this.state = {
            listings: false,
            completed: true
        }
    }
    async componentDidMount() {
        let res = await axios.get(`/retrieve/applications/${this.props.match.params.id}`)
        this.setState({ listings: res.data })
    }
    mapListings() {
        let all = [];
        this.state.listings.map(
            (e) => {
                return all.push(
                    <div key={e.completed_id}>
                    <RenderCompletedListing deleteListing={this.deleteListing} listing={e} />
                    </div>
                )
            }
        )
        return all
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
        }
        return (
            <div>
                {mapped}
            </div>
        )
    }
}
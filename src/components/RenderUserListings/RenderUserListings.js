import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'
import AnsweredQuestion from './AnsweredQuestion/AnsweredQuestion';
class RenderUserListings extends Component {
    constructor() {
        super()
        this.state = {
            ids: false,
            listing: {},
            questions: []
        }
    }
    async componentDidMount() {
        let res = await axios.get(`/retrieve/completed/${this.props.match.params.id}`)
        // console.log(res.data)
        let listing = await axios.get(`/retrieve/listing/${res.data.listing_id}`)
        let questions = await axios.get(`/retrieve/questions/${res.data.listing_id}`)
        // let answers = await axios.get(`/retrieve/answered/${res.data.completed_id}`)
        this.setState({ listing: listing.data, questions: questions.data,ids: res.data})

    }
    mapQuestions() {
        let all = [];
        this.state.questions.map(
            (e) => {
                return all.push(
                    <div className='placeholder' key={e.question_id}>
                    <AnsweredQuestion  ids={this.state.ids} info={e} />
                    </div>
                )
            }
        )
        return all
    }
    render() {
        let { listing } = this.state
        let mapped = this.mapQuestions()
        return (
            <div className='center'>
                <div>Position: {listing.position}</div>
                <div>Location: {listing.location}</div>
                <div>Company Name: {listing.company_name}</div>
                <div>Company Summary: {listing.company_summary}</div>
                <div>Description: {listing.description}</div>
                <hr />
                {mapped}
                <hr />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(RenderUserListings);
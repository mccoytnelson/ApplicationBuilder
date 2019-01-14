import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'
import AnsweredQuestion from './AnsweredQuestion/AnsweredQuestion';
import './AnsweredQuestion.css'
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
        let listing = await axios.get(`/retrieve/listing/${res.data.listing_id}`)
        let questions = await axios.get(`/retrieve/questions/${res.data.listing_id}`)
        // let answers = await axios.get(`/retrieve/answered/${res.data.completed_id}`)
        this.setState({ listing: listing.data, questions: questions.data, ids: res.data })

    }
    mapQuestions() {
        let all = [];
        this.state.questions.map(
            (e) => {
                return all.push(
                    <div key={e.question_id}>
                        <AnsweredQuestion ids={this.state.ids} info={e} />
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
      
                <div className='renderListing'>
                    <div className='card'>
                        <div className='innerInnerListingApplication'>
                            <div className='topInfoApplication'>
                                <div id='topInfoCompanyApplication'>{listing.company_name}</div>
                                <div id='topInfoLocationApplication'>{listing.location}</div>
                            </div>
                            <div id='positionPos'>
                                <div id='topInfoPositionApplication'>{listing.position}</div>
                            </div>
                            <div className='listingDescriptionApplication'>Description: {listing.description}</div>
                            <div className='companySummaryApplication'>Company Summary: {listing.company_summary}</div>
                        </div>
                        <div className='listingRightSideApplication'>
                            {/* <div className='timeStamp'>{listing.timestamp.slice(0, 10)}</div> */}
                        </div>
                    </div>
                    <div className='questionHolder' >
                    {mapped}
                    </div>
                </div>
        
        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(RenderUserListings);
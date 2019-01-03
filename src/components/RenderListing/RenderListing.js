import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import './RenderListing.css'
import axios from 'axios';
import AnswerableQuestion from './AnswerableQuestion/AnswerableQuestion'
import {connect} from 'react-redux'
class RenderListing extends Component {
    constructor() {
        super()
        this.state = {
            listing: {},
            upload: false
        }
    }
    async componentDidMount() {
        let res = await axios.get(`/retrieve/listing/${this.props.match.params.id}`)
        let res2 = await axios.get(`/retrieve/questions/${this.props.match.params.id}`)
        this.setState({ listing: res.data, questions: res2.data })
    }
    questionRender = (value) => {
        if (value) {
            let render
            render = value.map(e => {
                return (<div key={e.question_id}>
                    <AnswerableQuestion upload={this.state.upload} info={e} />
                    <hr />
                </div>
                )
            })

            return render
        }
    }
    submitApplication = async () => {
        let accountID = this.props.id
        let listingID = this.props.match.params.id
        let res = await axios.post('/create/application', {
            listingID,accountID        
        });
        this.setState({ upload: res.data})
        
    }
    render() {
        let { listing, questions } = this.state
        let renderableQuestions = this.questionRender(questions)
        return (
            <div>
                <div>Position: {listing.position}</div>
                <div>Location: {listing.location}</div>
                <div>Company Name: {listing.company_name}</div>
                <div>Company Summary: {listing.company_summary}</div>
                <div>Description: {listing.description}</div>
                <hr />
                {renderableQuestions}
                <button onClick={this.submitApplication}>Submit Application</button>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {...state}
}
export default connect(mapStateToProps)(RenderListing);
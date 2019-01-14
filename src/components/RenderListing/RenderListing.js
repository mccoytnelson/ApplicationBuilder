import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import './RenderListing.css'
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import AnswerableQuestion from './AnswerableQuestion/AnswerableQuestion'
import { connect } from 'react-redux'
class RenderListing extends Component {
    constructor() {
        super()
        this.state = {
            listing: { timestamp: [] },
            upload: false,
            amount:false,
            uploads: 0
        }
    }
    async componentDidMount() {
        let res = await axios.get(`/retrieve/listing/${this.props.match.params.id}`)
        let res2 = await axios.get(`/retrieve/questions/${this.props.match.params.id}`)

        this.setState({ listing: res2.data[0], questions: res2.data,amount:res2.data.length})
    }
    questionRender = (value) => {
        if (value) {
            let render
            render = value.map(e => {
                return (
                    <AnswerableQuestion addOne={this.addOne} key={e.question_id} upload={this.state.upload} info={e} />
                )
            })

            return render
        }
    }
    addOne= ()=>{
        this.setState({uploads: this.state.uploads + 1})
    }
    submitApplication = async () => {
        let accountID = this.props.id
        let listingID = this.props.match.params.id
        let res = await axios.post('/create/application', {
            listingID, accountID
        });
        await this.setState({ upload: res.data })
      
    }
    render() {
        console.log(this.state.uploads)
        if(this.state.amount === this.state.uploads){
            alert('Thank you, your application has submitted')
           return <Redirect to={`/applications/${this.props.id}`}/>
        }
        let { listing, questions } = this.state
        let renderableQuestions = this.questionRender(questions)
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
                        <div className='timeStamp'>{listing.timestamp.slice(0, 10)}</div>
                    </div>
                </div>
                <div className='questionHolder'>
                    {renderableQuestions}
                    <div className='buttonHolder'>
                    <button className='submitButton' onClick={this.submitApplication}>Submit Application</button>
                    </div>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(RenderListing);
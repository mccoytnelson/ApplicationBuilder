import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { uploadData } from '../../ducks/reducer'
import Question from './Question/Question'
import axios from 'axios';
import './CreateListing.css'

class CreateListing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            amountOfQuestions: 1,
            daisyChain: false,
            totalPoints: 0,
            amountOfUploads: 0,
        }
    }
    componentDidMount() {
        let { companyName, companySummary, companyPhone, companyAddress } = this.props
        this.setState({
            companyName: companyName, companySummary: companySummary, companyPhone: companyPhone, companyAddress: companyAddress
        })
    }
    updateUploads = (points) => {
        this.setState({ amountOfUploads: this.state.amountOfUploads + 1, totalPoints: this.state.totalPoints + points })
        console.log(this.state.totalPoints)
    }
    questionRender = (howMany) => {
        let i = 0;
        let toRender = [];
        while (i < howMany) {
            i++
            toRender.push(<div key={i}><Question ref='triggerDaisy' updateUploads={this.updateUploads} addPoints={this.addPoints} daisyChain={this.state.daisyChain} /></div>)
        }
        return toRender
    }
    addPoints = (newPoints) => {
        this.setState({ totalPoints: this.totalPoints + newPoints })
    }
    addOne = () => {
        this.setState({ amountOfQuestions: this.state.amountOfQuestions + 1 })
    }
    submitApplication = async () => {
        let { id } = this.props
        let { position, location, salary, description, companyName, companySummary, companyPhone, companyAddress } = this.state
        let res = await axios.post('/create/listing', {
            id, companyName, companyAddress, companySummary, companyPhone, position, location, salary, description
        });
        this.setState({ daisyChain: res.data.listingID })
    }
    render() {
        if (this.state.amountOfQuestions === this.state.amountOfUploads) {
            console.log(this.state.amountOfQuestions, this.state.amountOfUploads, 'createlisting')
            return (<Redirect to={`/company/listings/${this.props.id}`} />)
        }
        let questions = this.questionRender(this.state.amountOfQuestions)
        return (
            <div>
                <div className='createBox'>
                    <div className='container'>
                        <div className='companyInfoContainer'>
                            <div className='topInfoContainer'>
                                <p className='createListingP' >CompanyName</p>
                                <input className='companyInfo' placeholder={'Write company name here...'} value={this.state.companyName} onChange={(e) => { this.setState({ companyName: e.target.value }) }} />
                            </div>
                            <div className='topInfoContainer'>
                                <p className='createListingP' >Company Phone</p>
                                <input className='companyInfo' placeholder={'Write company contact number here...'}value={this.state.companyPhone} onChange={(e) => { this.setState({ companyPhone: e.target.value }) }} />
                            </div>
                            <div className='topInfoContainer'>
                                <p className='createListingP' >Company Address</p>
                                <input className='companyInfo' placeholder={'Write company address here...'} value={this.state.companyAddress} onChange={(e) => { this.setState({ companyAddress: e.target.value }) }} />
                            </div>
                        </div>
                        <div className='info'>
                            <p className='createListingP' >Company Description</p>
                            <textarea className='textArea' value={this.state.companySummary} onChange={(e) => { this.setState({ companySummary: e.target.value }) }} />
                        </div>
                        <div className='companyInfoContainer'>
                            <div className='topInfoContainer'>
                                <p className='createListingP' >Position Title</p>
                                <input className='companyInfo' placeholder='postition title' value={this.state.position} onChange={(e) => { this.setState({ position: e.target.value }) }} />                                </div>
                            <div className='topInfoContainer'>
                                <p className='createListingP' >Job Location</p>
                                <input className='companyInfo' placeholder='location' value={this.state.location} onChange={(e) => { this.setState({ location: e.target.value }) }} />                                </div>
                            <div className='topInfoContainer'>
                                <p className='createListingP' >Pay Rate and Type</p>
                                <input className='companyInfo' placeholder='pay rate' value={this.state.salary} onChange={(e) => { this.setState({ salary: e.target.value }) }} />                                </div>
                        </div>
                        <div className='info'>
                            <p className='createListingP'  >Job Description</p>
                            <textarea className='textArea' value={this.state.description} placeholder='Write detailed job description here...' onChange={(e) => { this.setState({ description: e.target.value }) }} />
                        </div>

                    </div>
                    {questions}
                    <button className='createListingButton' onClick={this.addOne}>Add another Question?</button>
                    <button className='createListingButton' onClick={this.submitApplication}>Submit Application</button>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps, { uploadData })(CreateListing)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
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
            amountOfUploads: 0
        }
    }
    updateUploads = () => {
        this.setState({ amountOfUploads: this.state.amountOfUploads + 1 })
    }
    questionRender = (howMany) => {
        let i = 0;
        let toRender = [];
        while (i < howMany) {
            i++
            toRender.push(<div key={i}><Question ref='triggerDaisy' updateUploads={this.updateUploads} addPoints={this.addPoints} daisyChain={this.state.daisyChain}/></div>)
        }
        return toRender
    }
    addPoints=(newPoints)=>{
        this.setState({totalPoints: this.totalPoints + newPoints})
    }
    addOne = () => {
        this.setState({ amountOfQuestions: this.state.amountOfQuestions + 1 })
    }
    submitApplication = async () => {
        let { id, companyName, companySummary, companyPhone, companyAddress } = this.props
        let { position, location, salary, description } = this.state
        let res = await axios.post('/create/listing', {
            id, companyName, companyAddress, companySummary, companyPhone, position, location, salary, description
        });
        this.setState({daisyChain: res.data.listingID})
    }
    render() {
        if(this.state.amountOfQuestions === this.state.amountOfUploads){
            console.log(this.state.amountOfQuestions,this.state.amountOfUploads,'createlisting')
           return (<Redirect to={`/company/listings/${this.props.id}`} />)
        }
        let questions = this.questionRender(this.state.amountOfQuestions)
        console.log('anthing')
        return (
            <div>
                <div className='createBox'>
                    <div className='container'>
                        <div className='innerContainer'>
                            <div className='infos'>
                                <div className='info'><input placeholder='postition title' onChange={(e) => { this.setState({ position: e.target.value }) }} /></div>
                                <div className='info'><input placeholder='location' onChange={(e) => { this.setState({ location: e.target.value }) }} /></div>
                                <div className='info'><input placeholder='salary' onChange={(e) => { this.setState({ salary: e.target.value }) }} /></div>
                            </div>
                            <div className='disc'><input placeholder='job description' onChange={(e) => { this.setState({ description: e.target.value }) }} /></div>
                            <div>{this.props.companyName}</div>
                            <div>{this.props.companySummary}</div>
                            <div>{this.props.companyPhone}</div>
                            <div>{this.props.companyAddress}</div>
                            <div></div>
                        </div>
                        <div className='logo'>
                            <img className='logoInner' src='https://i.pinimg.com/236x/71/0c/72/710c72c8b66468a397777fcc90f71c30--serif-logo-logo-m.jpg' alt='Set your information' />
                        </div>
                    </div>
                    {questions}
                    <button onClick={this.addOne}>Add another Question?</button>
                    <button onClick={this.submitApplication}>Submit Application</button>
                    <button onClick={()=>{console.log(this.props)}}>props</button>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps, {uploadData })(CreateListing)
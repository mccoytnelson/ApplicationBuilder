import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
class AnswerableQuestion extends Component {
    constructor(props) {
        super(props)
        this.state={
            upload: false,
            hasUploaded: false,
            points: this.props.info.not_choice_points
        }
    }
    async componentDidMount() {
        if(this.props.info.choice  === 'true'){
        let res = await axios.post(`/retrieve/multi`,{id: this.props.info.question_id})
      console.log(this.props.info.not_choice_points)
        this.setState({ choices: res.data })
        }
    }
    handleChange = (selectedOption) => {
        console.log(selectedOption)
        this.setState({ answer: selectedOption.answer,points: selectedOption.points});
        console.log(this.state)
      }
    whichInput() {
        let boolean = this.props.info.choice
        if (boolean === 'true') {
            return <Select value={this.state.selectedOption} onChange={this.handleChange} options={this.state.choices}/>
        } else {
            return <input onChange={(e)=>{this.setState({answer: e.target.value, points: 2})}}/>
        }
    }
    async uploadAnswerableQuestion(data){
        let completedID = data.completed_id
        let {answer,points} = this.state
        let questionID = this.props.info.question_id
        await axios.post('/create/answered', {
        completedID,questionID,answer,points
    })
    this.setState({hasUploaded: true})
    }
    render() {
        let { info,upload } = this.props
        let {hasUploaded} = this.state
        let input = this.whichInput()
        if(upload !== false && hasUploaded === false){
            this.uploadAnswerableQuestion(upload[0]);
        }
        return (
            <div>
                {info.question}
                {input}
                {/* <button onClick={()=>{console.log(this.state)}}>state</button> */}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {...state}
}
export default connect(mapStateToProps)(AnswerableQuestion);
import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import { uploadData } from '../../../ducks/reducer'


class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
            answer: [],
        }
    };
    async componentDidMount() {
        let answer = await axios.get(`/retrieve/answered/${this.props.ids.completed_id}/${this.props.info.question_id}`)
        this.setState({answer: answer.data})
    }
    render() {
        return (
            <div className='answeredQuestion'>
                <div className='questionQ'>{this.props.info.question}</div>
                <div className='answerQ'>{this.state.answer.answer}</div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        ...state
    }
}
export default connect(mapStateToProps, { uploadData })(Question)
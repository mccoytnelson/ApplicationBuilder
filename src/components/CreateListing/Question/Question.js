import React, { Component } from 'react'
import { connect } from 'react-redux';
import MultipleChoice from './MultipleChoice/MultipleChoice'
import axios from 'axios'
import { uploadData } from '../../../ducks/reducer'
import './Question.css'


class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            amountOfAnswers: 1,
            question: '',
            points: 2,
            poppyChain: false,
            hasRan: false
        }
    };
    handleChange = () => {
        this.setState({
            checked: !this.state.checked
        })
    }
    addOne = () => {
        this.setState({ amountOfAnswers: this.state.amountOfAnswers + 1 })
    }
    multiRender = (howMany) => {
        let i = 0;
        let toRender = [];
        while (i < howMany) {
            i++
            toRender.push(<div key={i}><MultipleChoice shouldUpload={this.state.checked} poppyChain={this.state.poppyChain}/></div>)
        }
        return toRender
    }
    async uploadQuestion() {
        let {daisyChain} = this.props
        let {  question, checked, points } = this.state
        let res = await axios.post('/create/question', {
            daisyChain, question, checked, points
        });
        this.setState({poppyChain: res.data.questionID,hasRan: true});
        console.log('posted')
    }
    render() {
        if(this.props.daisyChain && !this.state.hasRan){
            this.uploadQuestion()
           
        }
        let multi = this.multiRender(this.state.amountOfAnswers)
        const { checked } = this.state
        const hidden = checked ? 'show' : 'hidden';
        return (
            <div className='placeholder'>
                <input placeholder='Write question here' onChange={(e)=>{this.setState({question:e.target.value})}}/>
                <div className='textAnswer'>
                    <input type='checkbox' checked={checked} onChange={this.handleChange} />
                    <div>Multiple Choice?</div>
                </div>
                <div className={hidden}>
                    {multi}
                    <button onClick={this.addOne}>Add another answer?</button>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        ...state
    }
}
export default connect(mapStateToProps,{uploadData})(Question)
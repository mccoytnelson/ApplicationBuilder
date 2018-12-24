import React, { Component } from 'react'
import { connect } from 'react-redux';
import MultipleChoice from '../MultipleChoice/MultipleChoice'
import './Question.css'


class Question extends Component {
    constructor(){
        super()
        this.state = {
            checked: false,
            amountOfAnswers: 1,
        }
    };
    handleChange=()=>{
        this.setState({
          checked: !this.state.checked
        })
      }
      addOne=()=>{
        this.setState({amountOfAnswers: this.state.amountOfAnswers + 1})
     }
     multiRender = (howMany) => {
        let i = 0;
        let toRender =[];
        while (i<howMany){
            i++
           toRender.push(<MultipleChoice/>)
        }
        return toRender
     }
    render() {
        let multi = this.multiRender(this.state.amountOfAnswers)
        const {checked} = this.state
        const hidden = checked ? 'show' : 'hidden';
        return (
            <div className='placeholder'>
                <input placeholder='Write question here' />
                <div className='textAnswer'>
                    <input type='checkbox'  checked={checked} onChange={this.handleChange}/>
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
export default connect(mapStateToProps)(Question)
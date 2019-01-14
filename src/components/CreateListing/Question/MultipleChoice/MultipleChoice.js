import React,{Component} from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import {uploadData} from '../../../../ducks/reducer'

class MultipleChoice extends Component{
    constructor(){
        super()
        this.state={
            answer: '',
            points: 2
        }
    }
    async uploadMulti() {
        let {poppyChain} = this.props
        let {answer,points} = this.state
        await axios.post('/create/multi', {
            poppyChain,answer,points
        });
        console.log('posted multi')
        this.props.addOneToUpload(this.state.points)
    }
    render(){
    if(this.props.poppyChain !== false && this.props.shouldUpload){
        this.uploadMulti(this.state.points)
    }
    return (
            <div>
                <div className='textAnswer'>
                    <textarea className='multiAnswer'placeholder='answer' onChange={(e)=>{this.setState({answer:e.target.value})}}/>
                    <input className='multipleChoice' placeholder='points?' onChange={(e)=>{this.setState({points:e.target.value})}}/>
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
export default connect(mapStateToProps,{uploadData})(MultipleChoice)
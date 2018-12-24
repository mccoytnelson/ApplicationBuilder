import React from 'react'
import { connect } from 'react-redux';


function MultipleChoice (props){
    return (
            <div>
                <div className='textAnswer'>
                    <input placeholder='answer' />
                    <input className='multipleChoice' placeholder='Points?' />
                    <input type='checkbox' /><div>AutoFail?</div>
                </div>
            </div>
    )
}


function mapStateToProps(state) {
    return {
        ...state
    }
}
export default connect(mapStateToProps)(MultipleChoice)
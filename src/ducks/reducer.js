const initialState = {
amount: 1,
}

//ACTION TYPE
// const UPDATENAME = 'UPDATENAME'
const UPLOAD_DATA = 'UPLOAD_DATA'
const WIPE_ALL = 'WIPE_ALL'
const ADD_TO_AMOUNT = 'ADD_TO_AMOUNT'
//ACTION CREATOR
export function uploadData(data){
    return{
        type: UPLOAD_DATA,
        payload: data
    }
}
export function wipeAll(){
    return{
         type: WIPE_ALL
    }
}
export function addToAmount(data){
    return{
         type: ADD_TO_AMOUNT,
         payload: data
    }
}
//REDUCER
export default function reducer(state = initialState, action){
    switch(action.type){
        case UPLOAD_DATA:
        return {...state,...action.payload};
        case WIPE_ALL:
        return initialState;
        case ADD_TO_AMOUNT:
        return {...state,...action.payload}
        default:
        return state;
    }
}



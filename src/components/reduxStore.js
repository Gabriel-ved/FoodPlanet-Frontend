import { createStore } from 'redux';

const INITIAL_STATE={
    products:[],
    account:'',
}

function stores(state=INITIAL_STATE,action){
    switch(action.type){
        case 'ADD_PROD':
            return  {...state,products:[...state.products,action.product]}
        case 'ADD_ACCOUNT':
            return {...state,account: action.account}
        default:
            return state;
    }
}

const store = createStore(stores);

export default store;
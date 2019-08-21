import { createStore } from 'redux';

const INITIAL_STATE={
    products:[],
    account:'',
    total:0
}

function stores(state=INITIAL_STATE,action){
    switch(action.type){
        case 'ADD_PROD':
            return  {...state,products:[...state.products,action.product],total:state.total + action.product.value} 
        case 'ADD_ACCOUNT':
            return {...state,account: action.account}
        case 'REMOVE_PROD':
            return {...state,products:state.products.filter(product=> product !== action.product),total:state.total - action.product.value};
        case 'REMOVEALL_PROD':
            return {...state,products:[],total:0}
        default:
            return state;
    }
}

const store = createStore(stores);

export default store;
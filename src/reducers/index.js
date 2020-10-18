import { combineReducers } from 'redux';
import * as types from './../actions/actionTypes';
import initialState from './initialState'; 
import authentication from './authenticationReducer'
 

const appReducer = combineReducers({
 
  authentication,
   
});

const rootReducer = (state, action, root) => {
  if (action.type === types.LOGOUT) {
    let newState = Object.assign({}, initialState, {      
    });
    state = newState;
  }
  return appReducer(state, action, root)
}

export default rootReducer;

//sample reducer

import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authentication(state = initialState.userInfo, action) {
  let newState={}
    switch (action.type) {
      case types.AUTHENTICATE_SUCCESS:
          
          newState = {...state, userInfo:  action.userInfo }; 
                    
         return newState;
      case types.AUTHENTICATE_FAILURE :
          newState = Object.assign({}, state,{
            userInfo: action.userFailure,
            isAuthenticated: false
            }); 
        return newState;
      default:
        return state;
    }
  }

import * as types from './actionTypes';
import apiConfigInfo from '../api/apiConfig'; 
import * as actionHelper from '../utility/actionHelper'; 

require('isomorphic-fetch');

export function authenticationSuccess(userInfo) {
  return { type: types.AUTHENTICATE_SUCCESS, userInfo };
}

export function authenticationFailure(userFailure) {
  return { type: types.AUTHENTICATE_FAILURE, userFailure }
} 
export function resetAuthInfo() {
  return async (dispatch) => {
    dispatch(authenticationFailure({}));
  }
}
export function authenticateAndFetchUserInfo(userInfo) {
  
  //For some reason spread operator not detecting change on subsequent call.
   
    let requestBody = {
      userName: userInfo.userName,
      password: userInfo.password,
    };
    const loginURL = `${apiConfigInfo.url}login/`;
    let options = actionHelper.getDataApiOptionsNotAuthenticated({ method: "POST" }, requestBody);
    return fetchAndDispatch(loginURL, options, userInfo.clientName);
  
}


const fetchData = (url, options) => {
  const fetchRequest = new Request(url, options);
  return fetch(fetchRequest)
    .then(response => response.json().then(result => ({ result })))
    .catch(error => ({ error }));
};

const fetchAndDispatch = (loginURL, options, clientName) =>{
  return async (dispatch) => {
    let userInfo = undefined;
     try {
       const responseData = await fetchData(loginURL, options);
       if (responseData.errorMessage === undefined) {
         let response = responseData.result;
         if(response.responseStatus){
           if(response.responseData && response.responseData.length > 0 && response.responseData[0]){
             userInfo = response.responseData[0];
           }else{
             userInfo = response;
           }
         }else{
           userInfo = response;
         }
         dispatch(authenticationSuccess(userInfo)); 
       } else {
         dispatch(authenticationFailure(responseData.result))
       }
     }
     catch (err) {
       dispatch(authenticationFailure(err))
     }
   return Promise.resolve(userInfo);
   };
}


import { isNullOrUndefined } from "util";
import { replaceNull, deleteKeysFromObject } from '../utility/generalFunctions';
require('isomorphic-fetch');


export function getDataApiOptions(requestOptions, requestBody) {
  let options = {
    method: requestOptions.method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + requestOptions.authToken
    }
  }
  if (!isNullOrUndefined(requestBody)) {
    options.body = JSON.stringify(requestBody);
  }
  return options;
}

 

export const fetchData = (url, options) => {
  const fetchRequest = new Request(url, options);
  return fetch(fetchRequest)
    .then(response => response.json().then(result => ({ result })))
    .catch(error => ({ error }));
};


export function fetchDataAndDispatch(url, options, dispatch, type, typeError) {
  const fetchRequest = new Request(url, options);
  return fetch(fetchRequest)
    .then(response => response.json().then(result => {
      result.responseStatus.statusDescription === "Success" ? dispatch(
        {
          type,
          payload: {
            data: (result.responseData[0]),
            error: null,
            loaded: true
          }
        })
        : dispatch({
          type: type,
          payload: {
            data: null,
            error: result.responseStatus,
            loaded: true
          }
        });
    }))
    .catch(error => {
      console.log(error)
      dispatch({
        type: type,
        payload: {
          data: null,
          error: error.responseStatus ? error.responseStatus : {
            errorMessage: [{
              key: "generic.error",
              message: "Server is down"
            }],
            "httpStatusCode": 500,
            "httpSubStatusCode": 500,
            "statusDesc": "ServerFailure"
          },
          loaded: true
        }
      })
    });
}


// //TODO: account for multiple types in array
// export function fetchDataAndDispatchWithPromise(url, options, dispatch, type, typeError) {
//  try {
//     const responseData = await this.fetchDataAndDispatch(url, options, dispatch, type);  
//   }
//   catch (err) { 
//   }
//   return Promise.resolve();
// };


/**
 * returns object from clientconfig based on the key specified.
 * @param {object} configObject 
 * @param {string} key 
 */

  

export function getDataApiOptionsNotAuthenticated(requestOptions, requestBody) {
  const options = {
    method: requestOptions.method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Client-Name': requestOptions.clientName
    },
    body: JSON.stringify(requestBody)
  }
  return options;
} 
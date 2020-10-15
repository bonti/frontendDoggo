import { useState, useReducer, useCallback } from "react";
import { useCookies } from 'react-cookie';
import apiConfigInfo from '../api/apiConfig';
import { isNullOrUndefined } from "util"; 
import * as PortalConstants from "../utility/constants";
require('isomorphic-fetch');

 
 const HTTP_STATUS_OK = 200;
 const HTTP_BAD_REQUEST = 400;
 const HTTP_UNAUTHORIZED= 401;
 const HTTP_NO_CONTENT=404;
 const HTTP_SERVER_FAILURE = 500;

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS":
      let data = [];
      let hasResponseData = false;
      if (!isNullOrUndefined(action.payload.result.responseData)) {
        data = action.payload.result.responseData;
        hasResponseData = true;
      }
      
      let result =
        action.payload.status === HTTP_STATUS_OK ? {
          ...state,
          data: hasResponseData? data:  action.payload.result,
          error: null,
          hasError: false,
          isLoading: false,
          success: true
        }

          : {
            ...state,
            data: null,
            error: action.payload.result.responseStatus ? action.payload.result.responseStatus : {
              errorMessage: [{
                key: "generic.error",
                message: "We are having some technical difficulties please try again later."
              }],
              "httpStatusCode": HTTP_SERVER_FAILURE,
              "statusDesc": "ServerFailure"
            },
            hasError: true,

            isLoading: false
          };
      return result;
    case "FETCH_FAILURE":
      return {
        ...state,
        data: null,
        error: action.payload.responseStatus ? action.payload.responseStatus : {
          errorMessage: [{
            key: "generic.error",
            message: "We are having some technical difficulties please try again later."
          }],
          "httpStatusCode": HTTP_SERVER_FAILURE,
          "statusDesc": "ServerFailure"
        },
        hasError: true,
        isLoading: false
      }
    default:
      return null;

  }
};

function getDataApiOptions(method, requestBody, authorization) {
  let options = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authorization
    }
  }
  if (!isNullOrUndefined(requestBody)) {
    options.body = JSON.stringify(requestBody);
  }
  return options;
}

const useApi = (apiPath, body, method) => {

  const [cookie] = useCookies();
  let options = getDataApiOptions(method, body, cookie[PortalConstants.AUTH_TOKEN]);

  const [url] = useState(apiConfigInfo.url + apiPath);


  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: null,
    hasError: false,
    errorMessage: "",
    data: null,
    request: body
  });

  const callApi = useCallback(async (body, method, newAPIPath) => {
    let APIUrl = url;
    if (newAPIPath) {
      APIUrl = apiConfigInfo.url + newAPIPath;
    }

    let didCancel = false;
    if (body) {
      options.body = JSON.stringify(body);
    }
    options.method = method;
    dispatch({ type: "FETCH_INIT" });
    const fetchRequest = new Request(APIUrl, options);
    try {
      let response = await fetch(fetchRequest);

      let status = response.status;
      let result = await response.json();

      if (!didCancel) {
        dispatch({ type: "FETCH_SUCCESS", payload: { result, status } });
      }
    } catch (error) {
      if (!didCancel) {
        dispatch({ type: "FETCH_FAILURE", payload: error });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, state.request]);

  return [state, callApi];
};

export default useApi;
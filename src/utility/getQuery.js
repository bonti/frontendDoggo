import queryString from 'query-string';
import { isNullOrUndefined } from "util";

/**
 * Returns complete set of query string parameter from url
 * @param {location} location 
 */
export const getQueryParam = (location) => {
    if(!isNullOrUndefined(location)) {
        return queryString.parse(location.search);
    }
    return null;
}


 

/**
 * Returns specific Q param query string parameter from url
 * @param {location} location 
 */
export const getQParam = (location) => {
    let params = getQueryParam(location);
    if(!isNullOrUndefined(params)) {
        return params.q;
    }
    return null;
}


/**
 * Returns complete set of query string parameter from string
 * @param {location} location 
 */
export const getQueryParamFromString = (location) => {
    if(!isNullOrUndefined(location)) {
        return queryString.parse(location);
    }
    return null;
}
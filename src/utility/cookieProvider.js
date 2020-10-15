import React from 'react';
import Cookies from 'js-cookie';
import { getItem } from './localStorage';
import * as constants from './constants';

export function setSavedSearchCookie(key, value, isUpdate = false) {
    let savedSearchName = getItem(constants.LOCALSTORAGE_LOGGEDIN_USER_KEY) + "_" + key;
    let savedSearches = Cookies.getJSON(savedSearchName);
    savedSearches = savedSearches ? savedSearches : [];
    if (isUpdate) {
        let index = savedSearches.findIndex(i => i.SavedSearchName === value.SavedSearchName);
        savedSearches.splice(index, 1);
    }
    savedSearches.push(value);
    Cookies.set(savedSearchName, savedSearches);
}

export function getSavedSearch(key) {
    let savedSearchName = getItem(constants.LOCALSTORAGE_LOGGEDIN_USER_KEY) + "_" + key;
    let savedSearches = Cookies.getJSON(savedSearchName);
    return savedSearches;
}


export function deleteSavedSearch(key, value) {
    let savedSearchName = getItem(constants.LOCALSTORAGE_LOGGEDIN_USER_KEY) + "_" + key;
    let savedSearches = Cookies.getJSON(savedSearchName);
    savedSearches = savedSearches ? savedSearches : [];

    let index = savedSearches.findIndex(i => i.SavedSearchName === value.SavedSearchName);
    if (index > -1) {
        savedSearches.splice(index, 1);
    }
    Cookies.set(savedSearchName, savedSearches);
}
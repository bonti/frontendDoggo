import { isNullOrUndefined } from "util";
import React from 'react'
import moment from 'moment';
import { notification } from 'antd';
import { FormattedMessage } from 'react-intl'
import Currency from 'react-currency-formatter';
import * as PortalConstants from './constants';

export function showComponentLabels(labelId, defaultMsg, labelDescription) {
  let columnLabel = null;
  if (labelId) {
    columnLabel = <FormattedMessage id={labelId} defaultMessage={defaultMsg} description={labelDescription}
      values={{ what: 'react-intl' }} />;
  }
  return columnLabel;
}

export function showComponentLabelsWithParameter(labelId, defaultMsg, labelDescription, param) {
  let columnLabel = null;
  if (labelId) {
    columnLabel = <FormattedMessage id={labelId} defaultMessage={defaultMsg} description={labelDescription}
      values={param} />;
  }
  return columnLabel;
}

//maxAge is in seconds
export function SetNewCustomCookie(cookies, currentCookieName, currentCookieValue) {
  cookies.set(currentCookieName, currentCookieValue, {
    path: "/"
  })
}
 export function removeCustomCookie(cookies, currentCookieName) {
  cookies.remove(currentCookieName)
}
 
export function truncate(input, length) {
  if (input && input.length > length)
    return input.substring(0, length) + '...';
  else
    return input;
}
 

 
export function compareArrays(old, changed) {
  for (let key in old) {
    if (changed[key] !== old[key]) {
      return true;
    }
  }
  return false;
}

export function checkIsObjectEmpty(jsonObject) {
  const isEmpty = Object.keys(jsonObject).length === 0 ? true : false;
  return isEmpty;
}

 
export function displayNotification(type, message, description, dutation = 3) {
  notification[type]({
    message: message,
    description: description,
    duration: dutation
  });
}

  
export function setAuthenticationTokens(userInfo, cookies) {
  if (userInfo !== undefined) {
    if (userInfo.status === "BAD REQUEST" || userInfo.status === 500) {
      userInfo.errorMessage = "API level error";
    }
    if (
      userInfo.status === "BAD REQUEST" ||
      userInfo.errorMessage !== undefined ||
      userInfo.status === 500
    ) {
      SetNewCustomCookie(
        cookies,
        PortalConstants.INVALID_CREDENTIALS,
        true
      );
      removeCustomCookie(cookies, PortalConstants.AUTH_TOKEN);
    } else {
      if (userInfo.token) {
        SetNewCustomCookie(
          cookies,
          PortalConstants.AUTH_TOKEN,
          userInfo.token.accessToken
        );
        removeCustomCookie(
          cookies,
          PortalConstants.INVALID_CREDENTIALS
        );
      }
    }
  }
}

 export function formatErrorMessage(s) {
  let message = s.split(" ", 1);
  if (isCamelCase(message[0])) {
    return s.replace(message[0], capitalize(message[0].replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ')));
  }
  else {
    return s;
  }
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function isCamelCase(s) {
  return /^[a-z][A-Za-z]*$/.test(s);
}

 
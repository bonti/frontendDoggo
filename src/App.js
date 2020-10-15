import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import PetManager from './components/public/PetManager'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import Home from './components/private/Home/Home'
import { IntlProvider } from "react-intl";//potential for ue for internationalization
import messages_en from './locales/en/common.json' 
 
import flatten from 'flat';
import { withCookies } from 'react-cookie';
import * as PortalConstants from './utility/constants';
import _ from 'lodash'; 
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

//TO Show extensible support of internationalization
//support for older browsers e.g IE11, Edge & Safari 13
if (!Intl.RelativeTimeFormat) {
  
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/en');
 
}

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

let i18nConfig = {
  locale: 'en',
  messages: messages_en
};
 

function getAuthToken(props) {
  if (props.userInfo === undefined) {
    return props.cookies.get(PortalConstants.AUTH_TOKEN);
  }

  if (props.userInfo.token !== undefined && props.userInfo.token.accessToken.length > 1)
    return props.userInfo.token.accessToken;
  return props.cookies.get(PortalConstants.AUTH_TOKEN);
}



class App extends Component {

  onChangeLanguage(lang) {
    switch (lang) { 
      case 'en': i18nConfig.messages = flatten(messages_en); break; 
      default: i18nConfig.messages = flatten(messages_en); break;
    }
    this.setState({ locale: lang });
    i18nConfig.locale = lang;
  }

  componentDidUpdate() {
    
  }



  componentDidMount() {
    Spin.setDefaultIndicator(spinIcon);
    
    
    let authToken = this.props.cookies.get(PortalConstants.AUTH_TOKEN);
    if (authToken && authToken.length > 1 && this.props.location.pathname.includes("petmanager/login")) {
      this.props.history.push("/home/petlist");
    } 
 
  }

  
  render() {
     return (
      <IntlProvider key={i18nConfig.locale} locale={i18nConfig.locale} messages={i18nConfig.messages}>
        <div style={{ height: "auto" }}>
          <Switch>
            <Route path="/petmanager" component={PetManager} />
            
              <AuthenticatedRoute path="/home"
                props=
                {{ authToken: getAuthToken(this.props) }} component={Home} />
            
            <Route path="/error" component={Error} />
          </Switch>
        </div>
      </IntlProvider>
    );
  }heo
}



export default withCookies((App));

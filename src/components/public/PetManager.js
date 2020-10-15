import React from 'react'
import { Switch, Route } from 'react-router-dom';
import LoginPage from './login/LoginPage'
 
  
const PetManager = (props) => {
    return (
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/petmanager/login' component={LoginPage} />
      </Switch>
    );
  };

  export default PetManager;

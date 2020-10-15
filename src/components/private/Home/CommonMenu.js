import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux'
import { withCookies } from 'react-cookie';
import { HomeOutlined,  CustomerServiceOutlined } from '@ant-design/icons'; 

import * as logoutAction from '../../../actions/logoutAction';
import { Menu, Dropdown} from 'antd'; 
import * as PortalConstants from '../../../utility/constants';
import { CaretDownOutlined } from '@ant-design/icons';

const  CommonMenu =(props) => {  

  let userInfo = useSelector(state=>state.authentication.userInfo);
let fullName = userInfo !== undefined? userInfo.name:"";
  const [user, setUser] = useState(userInfo);
  const  dispatch=useDispatch();  
  const  doLogout = () => {
      let cookies = props.cookies; 
      cookies.remove(PortalConstants.AUTH_TOKEN, {
        path: '/'
      });
      dispatch(logoutAction.logout());
      let loginPath = '/petmanager/login'; 
      props.history.push(loginPath);
    }
   
 
  let menu = ()=>{ return(
    <>
   
   
    <Menu style={{padding: '8px 8px 8px 8px', borderRadius: '2px'}}>  
    <Menu.Item style={{fontSize:'16px'}} onClick={() => doLogout()}> 
          Logout
      </Menu.Item>
    </Menu>
    </>);
  }
    return (
      
           <>
           

            <Menu  defaultSelectedKeys={['home']}
                    style={{ float: 'left', width: '400px' }}
                    theme='light'
                    visible={true}
                    mode="horizontal"      >
                    <Menu.Item key='home'>
                      <Link  to={{
                        pathname: '/home/petlist', 
                        state: { userInfo: props.userInfo }
                      }} >
                        <HomeOutlined />
                          Pet Manager Home
                      </Link></Menu.Item>
                    
                    
                    
                   <Menu.Item key='admin'> 
                        <Dropdown 
                          overlay={menu} 
                          trigger={['click', 'hover']}>
                            <div>
                        <span style={{fontWeight:'600', fontSize:'15px'}}>{fullName}</span>
                                   
                                      <div style={{float:'right'}}> <CaretDownOutlined></CaretDownOutlined></div>
                                      </div>
                       
                      </Dropdown>
                    </Menu.Item>
                </Menu>
                </>
                );
             
        }
 
export default withCookies(withRouter(CommonMenu));

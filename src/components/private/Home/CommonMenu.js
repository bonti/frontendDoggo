import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { withCookies } from 'react-cookie';
import { HomeOutlined,  CustomerServiceOutlined } from '@ant-design/icons'; 

import { Menu, Dropdown} from 'antd'; 
import * as PortalConstants from '../../../utility/constants';
import { CaretDownOutlined } from '@ant-design/icons';

const  CommonMenu =(props) => {  

  let fullName = useSelector(state=>state.authentication.userInfo.name);
     
  const  doLogout = () => {
      let cookies = props.cookies; 
      cookies.remove(PortalConstants.AUTH_TOKEN, {
        path: '/'
      });
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

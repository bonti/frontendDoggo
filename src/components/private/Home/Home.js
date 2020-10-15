import * as React from 'react';
import { useEffect, useContext , useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Card, Row, Col } from 'antd';
import * as PortalConstants from '../../../utility/constants';
import { Switch, Route } from 'react-router-dom'
import * as gfunctions from '../../../utility/generalFunctions'; 
import { withRouter } from "react-router"; 
 
import CommonMenu from './CommonMenu';
import {useSelector} from 'react-redux';
 

import "./Home.less";
import PetList from '../PetList/PetList';
import DogDetail from '../DogDetail/DogDetail';
 
import { withCookies } from 'react-cookie';
const Home = (props) => {

    const user = useSelector(state=>state.authentication.userInfo);

    const Meta = Card.Meta;
    const location = useLocation();
    const [userInfo, setUserInfo] = useState(props.location.state === undefined? {}: props.location.state.userInfo)

    useEffect(() => { 
     
     if(userInfo === null || userInfo === undefined && (location.state === null || location.state=== undefined)){
        let cookies = props.cookies; 
        cookies.remove(PortalConstants.AUTH_TOKEN, {
          path: '/'
        });
        props.history.push('/petmanager/login');
     }
     else{
         if(userInfo === null || userInfo === undefined && (location.state!== null && location.state!==undefined) ){
             setUserInfo(location.state.userInfo);
         }
     }
    });

    return (
        <>
            
                <Layout className="layout">
                <div>
                 
                <div > 
                    <Row>
                        <Col span={12} style={{ padding: "12px" }}>
                            <h2> 
                            Welcome {userInfo !== null && userInfo!== undefined? userInfo.name: ""}
                            </h2>
                        </Col>
                        <Col span={12} > 
                            <div style={{ float: "right" }}>
                                    <CommonMenu  mode="horizontal" show={true} 
                                      userInfo={userInfo}
                                       
                                    />
                            </div>
                               
                        </Col>
                    </Row> 
                    </div>
                    </div>
                    <Layout>
                        <div style={{ minHeight: 280 , margin:"25px"}}>
                            <Switch>
                                <Route exact path="/" user={userInfo} component={PetList}></Route>
                                <Route path="/home/petlist" user={userInfo} component={PetList} />
                                <Route path="/home/petdetails/:id" user={userInfo} component={DogDetail}></Route>
                                
                            </Switch>
                        </div>
                    </Layout>
                </Layout>
            


        </>

    );
}
export default withCookies (withRouter(Home));
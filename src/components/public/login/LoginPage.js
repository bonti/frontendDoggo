 
import * as React from 'react';
import { useEffect, useState } from 'react';  
import { withCookies } from "react-cookie"; 
import { useIntl } from 'react-intl';  
import { Card, Button, Input, Row, Col, Spin, Form } from "antd";
import useApi from '../../../hooks/useApi'; 
import * as PortalConstants from "../../../utility/constants";
import * as gfunctions from "../../../utility/generalFunctions";
import { useDispatch, useSelector } from "react-redux";
import {authenticateAndFetchUserInfo} from '../../../actions/authenticationActions';
import './LoginPage.less';
  
const LoginPage =(props)=> {

  const intl = useIntl(); 
  const userInfo = useSelector(state=>state.authentication.userInfo);
   const [hasLoginError, setHasLoginError]  = useState(false);
   const  [authenticateResponse, authenticateRequest] = useApi("login", null,PortalConstants.APIMETHODS.POST);
   const [loading, setLoading] = useState(false);
   const [form] =Form.useForm(); 
   const  dispatch=useDispatch();

  const showDashBoard = (userInfo) => {
    gfunctions.setAuthenticationTokens(userInfo, props.cookies);
    let authToken =  props.cookies.get(PortalConstants.AUTH_TOKEN);
    if (authToken !== undefined && authToken.length > 1) {

      props.history.push({
            pathname: '/home/petlist',
            state: { userInfo: userInfo }
        });
    }
  }
 
  useEffect(()=>{
    if(userInfo && userInfo!== undefined){
      showDashBoard(userInfo);
      setLoading(false);
    } 

  }, userInfo);

  // useEffect(() => {
  //   setLoading(false);
  //   if(authenticateResponse.data && !authenticateResponse.error && !authenticateResponse.isLoading){
  //     showDashBoard(authenticateResponse.data[0]); 
  //   }
  //   else if(authenticateResponse.error && !authenticateResponse.data && !authenticateResponse.isLoading){
  //     setHasLoginError(true);
  //   }
  // }, [authenticateResponse]);
 
  const handleSubmit = (values) => {
    let request={};
    request.userName=values.username;
    request.password = values.password;
    setHasLoginError(false);
    setLoading(true);

    dispatch(authenticateAndFetchUserInfo(request));
    //authenticateRequest(request, PortalConstants.APIMETHODS.POST); 
  };
  const onFinishFailed = ({ errorFields }) => {
    form.scrollToField(errorFields[0].name);
};

  return ( 
    <>
      <Row
        type="flex"
        style={{ minHeight: 750 }}
        justify="center"
        align="middle" >
         
        <Col xs={24} sm={20} md={16} lg={12} xl={8} align="middle">
          <Spin  size="large" spinning={loading} >
            <Card
              bordered={false}
              className="loginContainer"
              style={{
                top: "50%",
                minHeight: "440px",
                height: "auto",
                padding: "10px 20px 0px"
              }}
            >
              <h5 style={{ fontSize: "24px", textAlign: "center" }}>
                 To continue, please sign in below
              </h5>
              <Form layout="vertical" className="login-form" form={form}  
                onFinish={handleSubmit} onFinishFailed={onFinishFailed} >
              
                  <h1 style={{ textAlign: "center" }}>
                      Doggo Care Manager
                  </h1> 
 
                  <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your username!',
                              },
                            ]}
                          >
                            <Input size="large" type="text"   maxLength={50} placeholder="Username"/>
            </Form.Item>
</Col></Row> 
                   
                  <Row style={{ marginTop: "10px" }}>
                    <Col span={24}>
                    <Form.Item style={{ marginBottom: "0px" }}  name="password" label="Password"
                            rules={
                                [{
                                    required: true,
                                  
                                    message: "Password is required."
                                }
                                ]
                            }
                        >
                            <Input.Password size="large"  type="text" maxLength={50} placeholder="Password" /> 
                        </Form.Item> 
                    </Col>
                  </Row> 
                 
                
                <>
                  <h6
                    style={{
                      fontSize: "14px",
                      display: "flex",
                      color: "red",
                      height: "30px",
                      marginTop: "5px"
                    }}
                  >
                    {hasLoginError &&
                      (
                        <div style={{ marginTop: "12px" }}>
                          Your Login ID or Password was incorrect
                            
                        </div>
                      )}
                  </h6>
                </>
                <Form.Item>
                  <Row>
                    <Col span={24}>
                      <Button
                        size="large"
                        style={{
                          width: "100%",
                          marginTop:
                            "0px"
                        }}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Log In
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
                
              </Form>
              
            </Card>
          </Spin>
        </Col> 
      </Row>
   </>    
  );
} 

export default withCookies(LoginPage);

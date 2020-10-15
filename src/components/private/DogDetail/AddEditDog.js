
import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
 
import { Row, Col, Button, Spin, Form, Input, InputNumber, notification } from 'antd'; 
import { withRouter } from "react-router";  
import useApi from '../../../hooks/useApi'; 
import * as PortalConstants from "../../../utility/constants"; 
 

import ErrorSummary from '../../common/ErrorComponents/ErrorSummary';

//updateStatus
const AddEditDog = (props) => {
    
     const [loading, setLoading] = useState(false);
     const [initialValues, setInitialValues] = useState({});
     let fetchApiPath= "doggos-list/";
     let postPutApiPath = "doggo/"
 
     const [responseState, postRequest] = useApi(postPutApiPath, null);  
     const  [petdetailFetchResponse, petdetailFetchRequest] = useApi(fetchApiPath, null,PortalConstants.APIMETHODS.GET);
     const [petdetailData , setPetdetailData] =useState(props.details);

     const [showError, setShowError] = useState(false);
     
     const [form] = Form.useForm();
    useEffect(() => {
        if(props.mode === PortalConstants.MODAL_MODE_EDIT && props.details === undefined) { 
            setLoading(true);
            petdetailFetchRequest(null,PortalConstants.APIMETHODS.GET,fetchApiPath);
        }
    },[]);

    useEffect(() => {
        setLoading(false);
        if(petdetailFetchResponse.data && !petdetailFetchResponse.error && !petdetailFetchResponse.isLoading && !petdetailFetchResponse.hasError){
          setPetdetailData(petdetailFetchResponse.data.details);
          setInitialValues(petdetailFetchResponse.data.details);
          
        }
        else if(petdetailFetchResponse.error && !petdetailFetchResponse.data && !petdetailFetchResponse.isLoading){
          setShowError(true);

        }
      }, [petdetailFetchResponse]);

   
      
    useEffect(() => {
        if (!responseState.hasError && responseState.success === true) { 
            notification.success({
                message: props.mode === PortalConstants.MODAL_MODE_EDIT ? "Edit Dog Details" : "Add New Dog",
                description: 
                props.mode === PortalConstants.MODAL_MODE_EDIT ? "Details updated successfully!" : "New dog added successully!",
                
              });
            props.closeModal(true); 
        } 
    }, [responseState]);

    const onFinish = values => {
        let request = {details: values}; 

        if(props.mode=== PortalConstants.MODAL_MODE_ADD){
            postRequest(request,  PortalConstants.APIMETHODS.POST);

        }
        else{
            let newApiPath = postPutApiPath+ props.id;
            postRequest(request,  PortalConstants.APIMETHODS.PUT, newApiPath); 
        }

    
    };

    const onFinishFailed = ({ errorFields }) => {
        form.scrollToField(errorFields[0].name);
    };
 

    return (
        <>
          <Spin spinning={loading}>

          <Form layout="vertical" form={form} initialValues={initialValues}
                onFinish={onFinish} onFinishFailed={onFinishFailed} >
                <Row type="flex" gutter={48}>
                    <Col span={12} >
                        <Form.Item name="name" label="Name"
                            rules={[
                                {
                                    
                                    required: true,
                                    message:  "Name is required."
                                }
                            ]}>
                             <Input type="text" maxLength={250} />

                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="breed" label="Breed"
                            rules={[
                                {
                                    required: true,
                                    message: "Breed is required"
                                }]}>

                            <Input type="text" maxLength={250} />

                        </Form.Item>
                    </Col>
                </Row>
                <Row type="flex" gutter={48}>
                    <Col span={12} >
                        <Form.Item name="age" label="Age"
                            rules={[
                                {
                                    required: true,
                                    message:  "Age must be greater than 0 and is required"
                                }
                            ]
                            }>
                            <InputNumber min={1} max={60} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="color" label="Color"
                        rules={[
                                {
                                    required: true,
                                    message: "Color is required"
                                }]}>
                        <Input type="text" maxLength={250} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row type="flex" gutter={48}>
                    <Col span={12} >
                    <Form.Item name="height" label="Height"
                        rules={[
                                {
                                    required: true,
                                    message: "Height is required"
                                }]}>
                        <Input type="text" maxLength={250} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item name="weight" label="Weight"
                        rules={[
                                {
                                    required: true,
                                    message: "Weight is required"
                                }]}>
                        <Input type="text" maxLength={250} />
                        </Form.Item>
                    </Col>
                </Row>
                
                {
                    (responseState.hasError) ?
                        <ErrorSummary error={responseState.error} />
                        : null
                }
                <Row type="flex" gutter={8} style={{ marginTop: 40 }}>
                    <Col span={16} />
                    <Col span={16} />
                    <Col span={8} align="right">
                        <div style={{ display: 'inline-block' }}>
                            <Button
                                type="secondary"
                                onClick={() => props.closeModal(false)}>
                                Cancel
                            </Button>

                            <Button loading={responseState.isLoading}
                                type="primary" htmlType="submit">
                               Save
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
         </Spin>
        </>

    );
}
export default withRouter(AddEditDog);
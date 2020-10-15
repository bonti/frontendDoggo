
import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, List, Card, Spin, Descriptions, Divider } from 'antd'; 
import { withRouter } from "react-router";  
import useApi from '../../../hooks/useApi'; 
import * as PortalConstants from "../../../utility/constants"; 
import { Link } from 'react-router-dom'

import ErrorSummary from '../../common/ErrorComponents/ErrorSummary';

//updateStatus
const AddEditDog = (props) => {
    // const location = useLocation();
     const [loading, setLoading] = useState(false);
    // let fetchApiPath= "doggo/";
    // if(props.match && props.match.params && props.match.params.id){
    //     fetchApiPath+=props.match.params.id;
    // }
    // //thi.props.match.params.userid
    // const  [petdetailFetchResponse, petdetailFetchRequest] = useApi(fetchApiPath, null,PortalConstants.APIMETHODS.GET);
    // const [petdetailData , setPetdetailData] =useState(null);
    // const [showError, setShowError] = useState(false);
    // useEffect(() => {
    //     if(petdetailData === null && !loading && !petdetailFetchResponse.isLoading && petdetailFetchResponse.hasError === false){
    //         setLoading(true);
    //         petdetailFetchRequest(null,PortalConstants.APIMETHODS.GET,fetchApiPath);
    //     }
    // });

    // useEffect(() => {
    //     setLoading(false);
    //     if(petdetailFetchResponse.data && !petdetailFetchResponse.error && !petdetailFetchResponse.isLoading && !petdetailFetchResponse.hasError){
    //       setPetdetailData(petdetailFetchResponse.data.details);
    //     }
    //     else if(petdetailFetchResponse.error && !petdetailFetchResponse.data && !petdetailFetchResponse.isLoading){
    //       setShowError(true);
    //     }
    //   }, [petdetailFetchResponse]);
      

    return (
        <>
          <Spin spinning={loading}>

              Adding or Editing a dog.
           
            {/* {petdetailData && petdetailData!==null && loading === false &&
            
                <Card title={petdetailData.name}>
                    <>
                    
                <Descriptions>
                <Descriptions.Item label="Breed">{petdetailData.breed}</Descriptions.Item> 
                
                <Descriptions.Item label="Height">{petdetailData.height}</Descriptions.Item> 
                
                <Descriptions.Item label="Weight">{petdetailData.weight}</Descriptions.Item>
                
                <Descriptions.Item label="Color">{petdetailData.color}</Descriptions.Item>  
                <Descriptions.Item label="Age">{petdetailData.age}</Descriptions.Item> 

                </Descriptions>

                 </> 
                
                </Card> 
            }

            {petdetailFetchResponse.hasError && showError  &&
             <ErrorSummary error={petdetailFetchResponse.error} />
            } */}
         </Spin>
        </>

    );
}
export default withRouter(AddEditDog);
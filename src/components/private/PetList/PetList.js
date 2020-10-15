import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { List, Card, Spin, Modal } from 'antd'; 
import { withRouter } from "react-router";  
import useApi from '../../../hooks/useApi'; 
import * as PortalConstants from "../../../utility/constants"; 
import { Link } from 'react-router-dom';

import { PlusCircleOutlined } from '@ant-design/icons'; 

import ErrorSummary from '../../common/ErrorComponents/ErrorSummary';
import './PetList.less'
import AddEditDog from '../DogDetail/AddEditDog';
 
const PetList = (props) => { 
   
    const [loading, setLoading] = useState(false);
    let fetchApiPath= "doggos-list";

    const addTitle= "Add New Dog";
    const editTitle="Edit Dog Details";

    const [openAddEditModal, setOpenAddEditModal] = useState(false);
    const [modalMode, setModalMode] = useState(PortalConstants.MODAL_MODE_ADD);
    const [selectedDogId, setSelectedDogId] =useState(0);
    const [modalTitle, setModalTitle] =useState(addTitle);
    const  [petlistsFetchResponse, petlistsFetchRequest] = useApi(fetchApiPath, null,PortalConstants.APIMETHODS.GET);
    const [petlistData , setPetlistData] =useState(null);
    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if(petlistData === null && !loading && !petlistsFetchResponse.isLoading && petlistsFetchResponse.hasError === false){
            setLoading(true);
            petlistsFetchRequest(null,PortalConstants.APIMETHODS.GET,fetchApiPath);
        }
    });

    useEffect(() => {
        setLoading(false);
        if(petlistsFetchResponse.data && !petlistsFetchResponse.error && !petlistsFetchResponse.isLoading && !petlistsFetchResponse.hasError){
          setPetlistData(petlistsFetchResponse.data.doggos);
        }
        else if(petlistsFetchResponse.error && !petlistsFetchResponse.data && !petlistsFetchResponse.isLoading){
          setShowError(true);
        }
      }, [petlistsFetchResponse]);
     
      const addNewDog=()=>{
          setOpenAddEditModal(true);
          setModalMode(PortalConstants.MODAL_MODE_ADD);
          setModalTitle(addTitle);
      }

      const editDog =(item)=>{
        setOpenAddEditModal(true);
        setModalMode(PortalConstants.MODAL_MODE_EDIT);
        setModalTitle(editTitle);
        setSelectedDogId(item.id);
      }

      const onModalClose = (flag)=>{
          setOpenAddEditModal(false);
          if(flag){
            petlistsFetchRequest(null, PortalConstants.APIMETHODS.GET,fetchApiPath);
          }
      }

    return (
        <>
        <Spin spinning={loading}>
            <h2>
                Pets  &nbsp; &nbsp; &nbsp; <Link onClick={addNewDog}> <PlusCircleOutlined></PlusCircleOutlined> Add Dog</Link>
            </h2>
            {petlistData && petlistData!==null && loading === false &&
            <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={petlistData}
            renderItem={item => (
            <List.Item>
                <Card title={item.name} extra={
                <>
                <Link to={"/home/petdetails/"+item.id}> View Detail</Link>
                
                <Link onClick={()=>{editDog(item)}}> Edit</Link>
                </>
                }>
                    <>
                    {item.breed}
                  
                </>
                
                </Card>
            </List.Item>
            )}
            
            
            />
            }

            
                     {openAddEditModal &&
                        <Modal
                            title={<b>{modalTitle}</b>}
                            maskClosable={false}
                            visible={openAddEditModal}
                            footer={null}
                            style={{ width: "100%" }}
                            onCancel={() => onModalClose(false)}
                        >
                            <AddEditDog
                               // openAddEditModal={openAddEditModal}
                                closeModal={onModalClose}
                                mode={modalMode}
                                id={selectedDogId}
                                 />
                        </Modal>
                    }
                   
         

            {petlistsFetchResponse.hasError && showError  &&
             <ErrorSummary error={petlistsFetchResponse.error} />
            }
         </Spin>
        </>

    );
}
export default withRouter(PetList);
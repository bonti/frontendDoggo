import React, { Component } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Result, Button, Typography } from 'antd';
import { HTTP_BAD_REQUEST } from '../../../utility/constants';
import NoResultFound from '../NoResultFound';
import * as gFunctions from '../../../utility/generalFunctions';

const { Paragraph } = Typography;

class Error extends Component {
    renderErrorMessages = (errorMessages) => {
        let e = errorMessages.map(
            (error, index) =>
                <Paragraph key={error.key + index}>
                    <CloseCircleOutlined style={{ color: 'red' }} /> {error.message}
                </Paragraph>);
        return e;
    }

    render() {
        const { error, isSearch, type } = this.props;
        return (

            <React.Fragment>
                {
                    error.httpStatusCode === HTTP_BAD_REQUEST ?
                        <NoResultFound isSearch={isSearch} />
                        :
                        <Result
                            status={type ? type : "error"}
                            title="Error"
                            subTitle={(error.errorMessage[0].key !== "error" ? error.errorMessage[0].key.toUpperCase() + " " : "") + gFunctions.formatErrorMessage(error.errorMessage[0].message)}
                            extra={[
                                <Button key="buy" onClick={this.props.refreshFunction}>Try Again</Button>,
                            ]}
                        >

                        </Result>

                }
            </React.Fragment>


        );
    }
}

export default Error;
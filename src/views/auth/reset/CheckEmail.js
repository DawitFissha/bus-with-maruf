import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Card from '../../../Components/Card/MainCard';

const CheckEmail = () => {
    return (
        <React.Fragment>
            <Row style={{maxWidth:'100%',margin:'auto'}}>
        <Col>
                    <Card title="Verification" >
                        <p>
                           please check your email address for reseting password link

                        </p>
                        <p>
                         <a href="mailto:marufbelete@gmail.com">Check Email</a>  
                           
                        </p>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CheckEmail;

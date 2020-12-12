import React from "react";
 import { Link } from 'react-router-dom';
import {  Container, Row, Col } from "reactstrap";
import { MDBBtn
} from "mdbreact";
import UserModal from '../Home/userModal';

class UserPage extends React.Component {
   constructor ( props ) {
        super( props );
      }
  render() {
    return (
      <>
       <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "500px",
            width:"100%",
            backgroundImage:
              "url(" + require("./profile-cover.jpeg") + ")",
            backgroundSize: "cover",
            overflow:"hidden",
            backgroundPosition: "center top"
          }}
        >
          <span className="mask bg-gradient-default opacity-8" />
          <Container className="d-flex align-items-center" fluid className="mb-5">
            <Row className="mb-5">
              <Col >
              <div style={{position:"relative", display:"block", top:"-150px",fontWeight:"bold"}}>
                <h1 className=" text-white">Hello ADMIN</h1>
                <p className="text-black mt-0 mb-5">
                  Email :anantgupta888@gmail.com
                </p>
 </div>

              </Col>
              <div style={{position:"absolute",bottom:"435px"}}>
              <UserModal/>
            </div>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default UserPage;

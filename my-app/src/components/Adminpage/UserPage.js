import React from "react";
import {  Container, Row, Col } from "reactstrap";
import UserModal from '../Home/userModal';
import "./userpage.css";

class UserPage extends React.Component {
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
          <Container className="d-flex align-items-center mb-5" fluid >
            <Row className="mb-5">
              <Col >
              <div style={{position:"relative", display:"block", top:"-150px",fontWeight:"bold"}} className="yoo">
                <h1 className="text-white">Hello ADMIN</h1>
                <p className="text-black mt-0 mb-5">
                  Email :anantgupta888@gmail.com
                </p>
 </div>

              </Col>
              <div style={{position:"relative",right:"269px",bottom:"70px"}} className="yo">
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

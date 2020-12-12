import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from 'react-router-dom';
import UserModal from './userModal';
import Homepage from "./userpage";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
//  import { MDBBtn
// } from "mdbreact";
import "./homestyle.css";
import UserHeader from "./UserHeader";

import ScrollToTop from "../../scrolltop";
class Home extends Component {
  constructor(props)
  {
    super(props)
   console.log(props)
  }
  render() {
    if (this.props.loggedIn && !this.props.admin) {
      return (
        <>
    <ScrollToTop />
        <div className="container">
          <div className="card" >
            <div className="card-body">
              <h5 className="card-title">WelCome {this.props.name}</h5>
              <p className="card-text">Email :{this.props.email}</p>
              <UserModal />
              <Homepage id={this.props.id} name={this.props.name} />
              <Card className="mt-2 col-6">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Relative"s QR CODE</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody style={{background:"rgb(224, 224, 209)"}}>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Relative Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="name"
                              placeholder="Username"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="."
                            >
                              Mobile Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="mobile"
                              placeholder="MobileNo."
                              type="integer"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                        <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="email"
                              placeholder="Type Email"
                              type="email"
                            />
                          </FormGroup>
                          
                        </Col>
                      </Row>
                    </div>
                 <div className="row mt-2">
                    <div className="col-4">
                    </div>
                    <div className="col-5 ">
                       <Input 
                              id="input"
                              type="submit"
                            />
                            </div>
                        </div>    

                  </Form>
                </CardBody>
              </Card>
            </div>
          </div>
        </div >
      </>
      )
    }
    if (this.props.loggedIn && this.props.admin) {
      return (
      <>
      <UserHeader />
    </>
      )
    }
    else {
      return (
  <>
    <ScrollToTop />
        <div> <h1>Welcome To RBC</h1>
         <div className="footer">
  <div id="button"></div>
<div id="container">
<div id="cont">
<div className="footer_center">
     <h3>Minor Project on QR CODE Generator And Scanner</h3>
       </div>
</div>
</div>
</div>
        </div >
        </>
      )
    }
  }
}

const mapStateToProps = state => {
  if (state.auth.loggedIn && state.auth.user) {
    let userData = JSON.parse(state.auth.user);
    return {
      id:userData._id,
      name: userData.name,
      email: userData.email,
      loggedIn: state.auth.loggedIn,
      admin:userData.admin
    };
  }
  else {
    return {};
  }
};
export default connect(
  mapStateToProps,
  null
)(Home);


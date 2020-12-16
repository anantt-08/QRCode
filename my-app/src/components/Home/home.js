import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css'; 
import UserModal from './userModal';
import Homepage from "./userpage";
import Relativepage from "./relativepage";
import FrontPage from "./index.js";
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import "./homestyle.css";
import UserHeader from "./UserHeader";

import ScrollToTop from "../../scrolltop";
class Home extends Component {
  constructor(props)
  {
    super(props)
   this.state={
      date:null,
      birth:null,
      startDate: null,
      time:"select",
      name:"",
      mobile:"",
      qrcode:[],
      already:true,
      main:""
         }
  }

  componentDidMount(){
    this.setState({
      main:this.props.id
    })
  }
  handleForm = e => {
    e.preventDefault();
     if(this.state.time==='select')
    {
        NotificationManager.warning("Please Select Time Slot");
        return false;
    }
    const data = {
      name: this.state.name,
      birth:this.state.date,
mobile:this.state.mobile,
time:this.state.time,
main:this.state.main
    };
    axios
    .post("http://localhost:9000/api/relatives/register", data)
    .then(result => {
      NotificationManager.success(result.data.msg);
      this.setState({qrcode:[result.data.user]})
      this.setState({already:false})
    })
    .catch(err => {
      if (err.response && err.response.status === 400){
        NotificationManager.error(err.response.data.msg);
        if(err.response.data.user!=undefined){
          this.setState({qrcode:[err.response.data.user]})
          this.setState({already:true})
        }
        else{
           this.setState({qrcode:[]})
        }
      }
      else{
        NotificationManager.error("Something Went Wrong");
      this.setState({ errors: err.response })
      this.setState({qrcode:[]})
    }
    });
};

  getPickerValue = (value) => {
    if(value!=null){
   let A=value.toString().split(" ").slice(1, 4).join(" ")
    this.setState({date:A})
 }
   else{
    this.setState({date:null})
    }
    this.setState({birth:value});
  }

  handleSelect=(e)=>{
    console.log(e);
    this.setState({
      time:e
    })
  }
  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  render() {
    if (this.props.loggedIn && !this.props.admin) {
      return (
        <>
    <ScrollToTop />
        <div className="container">
          <div className="card" style={{background:"#ecf0f1"}}>
            <div className="card-body">
             <div style={{display:"flex", flexWrap: "wrap" , justifyContent:"space-between", textDecoration: "underline",textDecorationColor:"brown"}}>
              <h5 className="card-title"><span style={{color:"red"}}>WElCOME</span> {this.props.name}</h5>
              <p className="card-title" style={{color:"black",fontSize:"20px"}}><span style={{color:"red"}}>Email: </span>{this.props.email}</p>
              </div>
             <div style={{display:"flex", flexWrap: "wrap" , justifyContent:"space-between"}}>
              <UserModal />
              <div >
              <Homepage id={this.props.id} name={this.props.name} />
              </div>
              </div>
              <br />
              <br />
               <Card className="mt-2 col-6" style={{position:"absolute",top:"127px"}}>
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Relative's QR CODE</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody >
                  <Form onSubmit={this.handleForm}>
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
                              onChange={this.handleInput} 
                              className="form-control-alternative"
                              id="name"
                              name="name"
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
                            name="mobile"
                             onChange={this.handleInput} 
                              className="form-control-alternative"
                              id="mobile"
                              placeholder="MobileNo."
                              type="integer"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                        <FormGroup>
                             <label
                              className="form-control-label"
                           
                            >
                             Date Of Visit
                            </label>
                            <DatePicker
            required
            dateFormat="dd/MM/yyyy"
            isClearable={true}
            className="startDate"
            placeholderText="Select Date Of Visit"
            fixedHeight={true}
            minDate={Date.now()}
            tetherConstraints={ [] }
            popperPlacement="right-top"
            popperModifiers={{
             flip: {
               enabled: false
             },
             preventOverflow: {
               enabled: true,
               escapeWithReference: false
             }
           }}
            selected={this.state.birth} onChange={this.getPickerValue} 
           selectsStart
            startDate={this.state.startDate}
          />
                          </FormGroup>
                          
                        </Col>
                        <Col lg="6">
                        <FormGroup>
                             <label
                              className="form-control-label m-0 p-0"
                           
                            >
                        
                             Time Slot For Visit
                            </label>
                         <DropdownButton
      alignRight
      title={this.state.time}
      id="dropdown-menu-align-right"
      onSelect={this.handleSelect}
      size="sm"
        >
              <Dropdown.Item eventKey="Morning Slot-  [7AM-12PM]">Morning Slot-  [7AM-12PM]</Dropdown.Item>
               <Dropdown.Divider />
              <Dropdown.Item eventKey="Afternoon Slot-  [12PM-5PM]">Afternoon Slot-  [12PM-5PM]</Dropdown.Item>
               <Dropdown.Divider />
              <Dropdown.Item eventKey="Evening Slot-  [5PM-9PM]">Evening Slot-  [5PM-9PM]</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="Night Slot-  [9PM-12AM]">Night Slot-  [9PM-12AM]</Dropdown.Item>
      </DropdownButton>

                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                 <div className="row mt-2">
                    <div className="col-4">
                    </div>
                    <div className="col-5 ">
                       <Input 
                             className="btn-success"
                              id="input"
                              type="submit"
                            />
                            </div>
                        </div>    

                  </Form>
                </CardBody>
              </Card>
            </div>
            {this.state.qrcode.length == 0 ? <div></div> :<Relativepage id= {this.state.qrcode[0]._id } name={this.state.qrcode[0].name} already={this.state.already}/>  
             }
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
        <div> 
        <FrontPage />
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


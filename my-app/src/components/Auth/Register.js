import React, { Component } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "./styles.css";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css'; 
import "react-datepicker/dist/react-datepicker.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput , MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date:null,
      startDate: null,
      email: "",
      password: "",
      house:"",mobile:"",occupation:"",birth:null,
      password_confirmation: "",
      errors: {}
    };
  }
  handleForm = e => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      house:this.state.house,
      birth:this.state.date,
      occupation:this.state.occupation,
mobile:this.state.mobile,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };
    axios
    .post("http://localhost:9000/api/users/register", data)
    .then(result => {
      NotificationManager.success(result.data.msg);
    })
    .then(r=>{
       setTimeout(() => {
        NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
        this.props.history.push("/");
       }, 1000);
    })
    .catch(err => {
      if (err.response && err.response.status === 400)
        NotificationManager.error(err.response.data.msg);
      else
        NotificationManager.error("Something Went Wrong");
      this.setState({ errors: err.response })
    });
};
  getPickerValue = (value) => {
   let A=value.toString().split(" ").slice(1, 5).join(" ")
    this.setState({date:A})
    this.setState({birth:value});
  }
  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div  style={{
            width:"100%",
            backgroundImage:
              "url(" + require("./cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}>>
      <div className="content">
        <NotificationContainer />
                      
    <MDBContainer style={{ marginTop: 20 }} >
      <MDBRow>
        <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={this.handleForm}>
                <p className="h4 text-center py-1" style={{color:"green"}}>Register Up</p>
                <div className="grey-text row  m-0 p-0">
                <div className="col-md-6  m-0 p-0">
                  <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                     name="name" onChange={this.handleInput}
                  />
                 </div> 
                 <div className="col-md-6  m-0 p-0"> 
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    name="email" onChange={this.handleInput} 
                    required
                  />
                </div>
                </div>  
                 <div className="grey-text row  m-0 p-0">
                 <div className="col-md-6 m-0 p-0">
                   <MDBInput
                    label="Mobile Number"
                    icon="phone"
                    group
                    type="Number"
                     name="mobile" onChange={this.handleInput}
                  />
                </div>
                 <div className="col-md-6 m-0 p-0">
<MDBInput
                    label="Occupation"
                    icon="user-md"
                    group
                    type="text"
                     name="occupation" onChange={this.handleInput}
                  /> 
                  </div>
                  </div>
  <div className="grey-text row m-0 p-0">
  <div className="col-md-6 m-0 p-0">
<MDBInput
                    label="House Number"
                    icon="home"
                    group
                    type="text"
                     name="house" onChange={this.handleInput}
                  />
  </div>
       <div className="col-md-6 mt-4 p-0">
   <FontAwesomeIcon icon={faBirthdayCake} className="fa-2x" /> 
                  <label><span>&nbsp;&nbsp;</span>BirthDate:</label>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                                 <DatePicker
            required
             showTimeSelect
            dateFormat="dd-MM-yyyy"
            isClearable={true}
            placeholderText="Select Your Day"
            fixedHeight={true}
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
           className="startDate"
           showMonthDropdown
           showYearDropdown
          />
          <hr style={{marginTop:" -0.2rem",width:"94%"}} />
          </div>
               </div>
 <div className="grey-text row m-0 p-0">
 <div className="col-md-6 m-0 p-0">
                          <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                     name="password" onChange={this.handleInput} 
                    
                  />
                  </div>
                   <div className=" col-md-6 m-0 p-0">
                   <MDBInput
                    label="Confirm your Password"
                    icon="exclamation-triangle"
                    group
                    type="text"
                     name="password_confirmation" onChange={this.handleInput} 
                  />
 </div>
                </div>
                <div className="text-center py-1 ">
                  <MDBBtn color="cyan" type="submit" >
                    Register
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
            </div>
            </div>
    );
  }
}


export default Register;

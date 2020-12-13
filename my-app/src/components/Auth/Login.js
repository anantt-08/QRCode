import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./login.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdbreact";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", errors: {} };
  }
  handleForm = (e) => {
    e.preventDefault();
    if (this.state.email === "" || this.state.password === "") {
      NotificationManager.warning("Email And Password Required");
      return false;
    }
    const data = { email: this.state.email, password: this.state.password };
    axios
      .post("http://localhost:9000/api/users/login", data)
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        NotificationManager.success(result.data.msg);

        setTimeout(() => {
           this.props.setLogin(JSON.stringify(result.data.user));
          NotificationManager.listNotify.forEach((n) =>
            NotificationManager.remove({ id: n.id })
          );
          if (result.data.user.admin) {
            this.props.history.push("/admin");
          } else {
            this.props.history.push("/home");
          }
        }, 800);
      })
      .catch((err) => {
        if (
          err.response &&
          (err.response.status === 404 || err.response.status === 401)
        )
          NotificationManager.error(err.response.data.msg);
        else NotificationManager.error("Something Went Wrong");
        this.setState({ errors: err.response });
      });
  };
  handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <>
        <NotificationContainer />
        <div className="col-sm-1 col-md-2"></div>
        <MDBContainer className="p-0 col-sm-10 col-md-8">
          <MDBRow style={{ marginTop: 20 }}>
            <MDBCol>
              <form onSubmit={this.handleForm}>
                <MDBCard>
                  <MDBCardBody className="mx-4">
                    <div className="text-center">
                      <h3 className="dark-grey-text mb-5">
                        <strong style={{ color: "green" }}>Sign In</strong>
                      </h3>
                    </div>
                    <MDBInput
                      label="Your email"
                      group
                      type="email"
                      name="email"
                      onChange={this.handleInput}
                    />
                    <MDBInput
                      label="Your password"
                      group
                      type="password"
                      name="password"
                      onChange={this.handleInput}
                      containerClass="mb-0"
                    />
                    <div className="text-center">
                      <MDBBtn
                        type="submit"
                        gradient="blue"
                        color="white"
                        rounded={true}
                        outline={true}
                        className="btn-block z-depth-1a"
                      >
                        Sign in
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="col-sm-1 col-md-2"></div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (user) => dispatch({ type: "SET_LOGIN", payload: user }),
  };
};
export default connect(null, mapDispatchToProps)(Login);

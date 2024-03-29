import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as FaIcons from 'react-icons/fa';
function Layout(props) {

  const handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    props.logout();
  };
  const [pathname, setPathname] = useState('/');
  const checkActive = (match, location) => {
    if (!location) return false;
    setPathname(location.pathname);
    return pathname === "/" ? false : pathname === "/";
  }
  return (
    <div>
      <div className="navbar fixed-top navbar-expand-lg bg-dark navbar-dark">
        <NavLink to="/" className="navbar-brand">< FaIcons.FaQrcode style={{ height: '40px', width: '40px' }} /></NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {props.loggedIn ? (
            <Fragment>
              <ul className="navbar-nav mr-auto" style={{color: "white"}}>
                QRCode

                              </ul>
              <ul className="navbar-nav ml-auto">
                <li className={"nav-item " + (pathname === '/logout' ? 'active' : '')}>
                  <NavLink isActive={checkActive}
                    className="nav-link "
                    to="/logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </Fragment>
          ) : (
              <Fragment>
                <ul className="navbar-nav ml-auto">
                  <li className={"nav-item " + (pathname === '/login' ? 'active' : '')}>
                    <NavLink isActive={checkActive} to="/login" className="nav-link">Login</NavLink>
                  </li>
                  <li className={"nav-item " + (pathname === '/register' ? 'active' : '')}>
                    <NavLink isActive={checkActive} to="/register" className="nav-link">Register</NavLink>
                  </li>
                  <li className={"nav-item " + (pathname === '/forget-password' ? 'active' : '')}>
                    <NavLink isActive={checkActive} to="/forget-password" className="nav-link">Forget Password</NavLink>
                  </li>
                </ul>
              </Fragment>
            )}


        </div>
      </div>
      {props.children}
    </div >
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: "SET_LOGOUT" })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

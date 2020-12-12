import React from "react";
import { BrowserRouter as Router,Route,Redirect , Switch} from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/Home/home";
import 'mdbreact/dist/css/mdb.css';
import "./App.css";
import ScrollToTop from "./scrolltop";
import Register from "./components/Auth/Register";
import GuestRoute from "./components/GuestRoute";
import AuthRoute from "./components/AuthRoute";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import ForgetPassword from './components/Auth/forgetpassword';
import ResetPassword from './components/Auth/resetPassword';
import AdminPage from "./components/Adminpage/adminpage";
// import Scanuser from "./components/Adminpage/Scanuser";
import Userlist from "./components/Adminpage/Userlist";
import ErrorS from "./components/ErrorPage";
import 'react-notifications/lib/notifications.css';
import Scan from "./components/Adminpage/scan"

function App() {
  return (
    <Router>
    <ScrollToTop />
      <Layout>
        <Switch>          
        <Route path="/" exact component={Home} />
          <GuestRoute path="/login" exact component={Login} />
          <GuestRoute path="/register" exact  component={Register} />
          <GuestRoute path="/forget-password" exact component={ForgetPassword} />
          <GuestRoute path="/change-password/:slug" component={ResetPassword} />
          <AuthRoute path="/home" exact component={Home} />
          <PrivateRoute path="/admin" exact component={Home} />
          <PrivateRoute path="/admin/scan" exact component={Scan} />
          <PrivateRoute path="/admin/admin" exact component={AdminPage} />
            <PrivateRoute path="/admin/users" exact component={Userlist} />
          <Route path ="/error"  component={()=> <ErrorS /> } />
          <Redirect to="/error"/>
          </Switch>
      </Layout>
    </Router>
  );
}

export default App;

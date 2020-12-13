import React, { Component } from "react";
import QrReader from "react-qr-reader";
import { MDBBtn
} from "mdbreact";
import * as s from './App.styles';
import Sidebar from '../Home/components/Sidebar/Sidebar';
import * as Palette from '../Home/colors'
class Scan extends Component {
  constructor ( props ) {
        super( props );
        this.state={
         colorr:"preDark",
         result: "No result"
        }
      }
  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };
  render() {

     const backgroundImage = 'images/mountain.jpg';
  const sidebarHeader = {
    fullName: 'DASHBOARD',
    shortName: ':)'
  };
  const menuItems = [
    {name: 'Home', to: '/home', icon: '/icons/home.svg' },
    {name: 'Scan', to: '/admin/scan', icon: '/icons/about.svg'},
    {name: 'User List', to: '/admin/users', icon: '/icons/blog.svg',  },
    {name: 'Pending REQ', to: '/admin/admin', icon: '/icons/destinations.svg' }
  ];

  const fonts = {
    header: 'ZCOOL KuaiLe',
    menu: 'Poppins'
  }
    return (
       <s.App>
      <Sidebar
        backgroundImage={backgroundImage}
        sidebarHeader={sidebarHeader}
        menuItems={menuItems}
        fonts={fonts}
        colorPalette={Palette[`${this.state.colorr}`]      }
       SELECTED="Scan"
      />  
      <div style={{width:"100%"}}>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "200px" }}
        />
        <p>{this.state.result}</p>
      </div>
      <div style={{postion:"absolute",zIndex:"1",
 gridGap:" 0px" ,
  gridTemplateRows: "50px 50px 50px 50px 50px" ,  display:"inline-grid",bottom:"40px",top:"0px",}}>
    <MDBBtn color="cyan" type="button" onClick={()=>{
      this.setState({colorr:"pinkAndBlue"})}
     } >
      </MDBBtn>
      <MDBBtn color="green" type="button" onClick={()=>{
      this.setState({colorr:"swampy"})}
     } >
      </MDBBtn>
      <MDBBtn color="blue" type="button" onClick={()=>{
      this.setState({colorr:"silver"})}
     } >
                  
                  </MDBBtn>
          <MDBBtn color="pink" type="button" onClick={()=>{
      this.setState({colorr:"dejaVu"})}
     } >
                  
                  </MDBBtn>
      <MDBBtn color="brown" type="button" onClick={()=>{
      this.setState({colorr:"brown"})}
     } >
                  
                  </MDBBtn>  
                  </div>  
 
       </s.App>  
    );
  }
}

export default Scan;

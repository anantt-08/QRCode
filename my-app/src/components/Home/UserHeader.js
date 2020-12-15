import React from "react";
import { MDBBtn
} from "mdbreact";
import * as s from './App.styles';
import * as Palette from './colors'

// Components
import Sidebar from './components/Sidebar/Sidebar';
import MainView from './components/MainView/MainView'
class UserHeader extends React.Component {
   constructor ( props ) {
        super( props );
        this.state={
         colorr:"preDark"
        }
      }
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
      <>
      <s.App>
      <Sidebar
        backgroundImage={backgroundImage}
        sidebarHeader={sidebarHeader}
        menuItems={menuItems}
        fonts={fonts}
        colorPalette={Palette[`${this.state.colorr}`]      }
        SELECTED="Home"
      />  

      <MainView />
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
  </>
    );
  }
}

export default UserHeader;

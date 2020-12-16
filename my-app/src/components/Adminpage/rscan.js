import React, { Component } from "react";
import QrReader from "react-qr-reader";
import { MDBBtn
} from "mdbreact";
import * as s from './App.styless';
import axios from "axios";
import Sidebar from '../Home/components/Sidebar/Sidebar';
import * as Palette from '../Home/colors';
import "./userpage.css";
import Dialog from "react-bootstrap-dialog";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Card from 'react-bootstrap/Card';
import { Icon, InlineIcon } from '@iconify/react';
import addImage from '@iconify-icons/flat-color-icons/add-image'; 
import beamingFaceWithSmilingEyes from '@iconify-icons/emojione/beaming-face-with-smiling-eyes';
import angryFace from '@iconify-icons/noto/angry-face';

class Scan extends Component {
  constructor ( props ) {
        super( props );
        this.state={
         colorr:"preDark",
                     delay: 100,
                    legacy:false,
         result: "",
         src:"",
         look:false,
         user:[],
        user1:[]
        }

        this.handleScan = this.handleScan.bind(this)
         this.isValidUrl = this.isValidUrl.bind(this)
      }
  handleScan = (data) => {
       if (data) {
     	const token = localStorage.getItem("token");
      this.setState({
        result: data,
      });

      if(!this.isValidUrl(this.state.result)){
   axios
      .get(
        `http://localhost:9000/api/relatives/find/${this.state.result}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        NotificationManager.success(res.data.msg);
        this.setState({
            user:[res.data.userlist],
        	src:"tick.png"
        })
        console.log(this.state.user)
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.msg);
        this.setState({
        	src:"cross.png",
        	user:[]
        })
      });      
      }
      else{
      	 NotificationManager.error("User not found");
      	 this.setState({
        	src:"cross.png",
            user:[]
        })
      	return;
      }
    }
  };
   
   isValidUrl = (string) => {
  try {
    new URL(string);
  } catch (_) {
    return false;  
  }

  return true;
}

  handleError = (err) => {
    console.error(err);
  };
    openImageDialog() {
        this.refs.qrReader1.openImageDialog()
    }
    togglle(){
      this.setState(prevState => ({
  legacy: !prevState.legacy,
  look:!prevState.look,
    result:"",
    src:"",
    user:[]
}));
    }


  deleteData = (id) => {
    console.log(`http://localhost:9000/api/relatives/find/${id}`)
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:9000/api/relatives/find/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        NotificationManager.success(res.data.msg);
        this.setState({user:[],
result:"",
    src:""
        })
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.msg);
      });
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
    {name: "Relative's Scan", to: '/admin/rscan', icon: '/icons/about.svg' },
    {name: 'User List', to: '/admin/users', icon: '/icons/blog.svg',  },
    {name: "Pending Request's", to: '/admin/admin', icon: '/icons/destinations.svg' }
  ];
   const previewStyle = {
            height: 240,
            width: 320,
        }

  const fonts = {
    header: 'ZCOOL KuaiLe',
    menu: 'Poppins'
  }
           
    	console.log(this.state.user)
    return (
    	<>
        <Dialog
              ref={(component) => {
                this.dialog = component;
              }}   />
    	       <NotificationContainer />
       <s.App>
      <Sidebar
        backgroundImage={backgroundImage}
        sidebarHeader={sidebarHeader}
        menuItems={menuItems}
        fonts={fonts}
        colorPalette={Palette[`${this.state.colorr}`]      }
       SELECTED="Relative's Scan"
      />  
      <div  className="WOHO">
       <img src={require("./video.png")}  onClick= { () =>{ {this.togglle()}; } } style={this.state.look ? {opacity:"0.2",height:"75px",width:"90px",cursor:"pointer"} :
        { opacity:"1.0",height:"75px",width:"90px",borderRadius:"2px",border:" 4px solid green",padding:"2px",pointerEvents: "none"}}/>
       <img src={require("./cam.png")}  onClick= { () =>{ {this.togglle()}; } } style={this.state.look ? {pointerEvents: "none",opacity:"1.0",height:"75px",width:"90px",float:"right",border:" 4px solid green",borderRadius:"10px",padding:"5px"} : 
       {opacity:"0.2",float:"right",height:"75px",width:"90px",cursor:"pointer"} }/>    
      <QrReader
           ref="qrReader1"
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          previewStyle={previewStyle}
          style={{ width: "400px",border:"5px groove #99e6e6"}}
          legacyMode={this.state.legacy}
        /> 
        <Icon icon={addImage} width={50} height={50} style={this.state.legacy ? { display:'inline-block', marginLeft: "80px"} : {display : 'none'}}/>
        <MDBBtn size="md" gradient="aqua" onClick= { () =>{ {this.openImageDialog()}  } } style={this.state.legacy ? { display:'inline-block'} : {display : 'none'}}>Open Image Dialog Box</MDBBtn>   
      </div> 
     <div  style={{
            width:"63%",
            backgroundImage:
              "url(" + require("./yooo.jpeg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}>>
     <div style={{postion:"relative",top:"50px",left:"100px"}}>

          <h1 style={{color:"rgb(176, 30, 149)",textAlign:"center"}}><i><b>For that Relative's :--</b></i></h1>
          {this.state.src=="" ? <div></div> : 
          <div  >
   {this.state.src=="tick.png" ?   
       <Card 
    style={{ width: '27rem' , top:"10px" , left:"30px"}}
    className="mb-2 mx-auto">
    <Card.Img variant="top" className="mx-auto"
    style={{width:"200px",height:"150px"}} src={require(`./${this.state.src}`)} />
    <Card.Body style={{background:"white",marginTop:"5px", color:"green"}}>
      <Card.Title>Welcome {this.state.user[0].name}</Card.Title>
      <Card.Text style={{fontSize:"16px"}}>
      <span style={{color:"#660000",fontSize:"19px"}} > <b>Details Of Logged in User </b> </span>-
        <br />
        <ul style={{color:"black",fontSize:"14px"}}>
      <li> <span style={{color:"#004d1a"}} ><i><u> HOUSE NUMBER  </u> </i>  </span> - {" "}{this.state.user[0].house}  </li>
       <li>   <span style={{color:"#004d1a"}} ><i> <u>Day Of Visit </u> </i> </span> - {" "}{this.state.user[0].birth} </li>
       <li> <span style={{color:"#004d1a"}} ><i><u> Shot Time Of Visit </u> </i>  </span> - {" "}{this.state.user[0].time}  </li>
      <li>   <span style={{color:"#004d1a"}} ><i> <u>Mobile No. </u> </i> </span> - {" "}{this.state.user[0].mobile} </li>
        </ul>
        <MDBBtn gradient="peach" type="button" onClick={() => {
                this.dialog.show({
                  title: "Confirmation",
                  body: "Verify and Delete Data?",
                  actions: [
                    Dialog.CancelAction(),
                    Dialog.OKAction(() => {
                      this.deleteData(this.state.user[0]._id);
                    }),
                  ],
                  bsSize: "small",
                  onHide: (dialog) => {
                    dialog.hide();
                    console.log("closed by clicking background.");
                  },
                });
              }}
              >
                   Verify! 
                  </MDBBtn>
      </Card.Text>
    </Card.Body>
    <Card.Footer style={{ background:"#ccffcc"}}>
      <span style={{color:"#004d1a",fontSize:"21px"}}> <i>Aapka Swagat Hai!! </i><Icon  width={27} height={27} icon={beamingFaceWithSmilingEyes}  /></span>
    </Card.Footer>
  </Card>   
     : 
    <Card        
    style={{ width: '27rem' , top:"10px" , left:"30px" ,height:"406px"}}
    className="mb-2 mx-auto">
    <Card.Img variant="top" className="mx-auto"
    style={{width:"200px",height:"150px"}} src={require(`./${this.state.src}`)} />
    <Card.Body style={{background:"white",marginTop:"13px", color:"red"}}>
      <Card.Title >Not Allowed</Card.Title>
      <Card.Text style={{fontSize:"16px",color:"brown"}}>
      <span style={{color:"green",fontSize:"19px"}} >  <b><i> <u>No Details Of Such Relative In Our Database!</u></i></b> </span>
        <br />
       <span style={{color:"black",fontSize:"17px",lineHeight:"20px"}}>
         The Person has ALready Visited Or the QR CODE Is Wrong! Please Try again With Valid!
         <br />
        <i> Thanks For visiting! </i>
        </span>
      </Card.Text>
    </Card.Body>
    <Card.Footer style={{background:" #ffaf1a"}}>
      <span  style={{color:"#800000",fontSize:"21px"}}> <i> You May Leave!! </i> <Icon  width={27} height={27} icon={angryFace} /> </span>
    </Card.Footer>
  </Card>
}
          </div>
      }  
     </div>

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
       </>  
    );
  }
}

export default Scan;


      //   if(!this.isValidUrl(this.state.result)){
      //  axios
      // .get(
      //   `http://localhost:9000/api/users/find/${this.state.result}`,
      //   {
      //     headers: {
      //       Authorization: token,
      //     },
      //   }
      // )
      // .then((res) => {
      //   this.setState({
      //       user1:[res.data.userlist]
      //   })
      // })
      // .catch((err) => {
      //   this.setState({
      //     user1:[]
      //   })
      // });      
      // }
      // else{
      //    this.setState({
      //       user1:[]
      //   })
      //   return;
      // }

 //     <li> <span style={{color:"#004d1a"}} ><i><u> Relative OF  </u> </i>  </span> - {" "}{this.state.user2[0].name}  </li>
 // <li>        <span style={{color:"#004d1a"}} > <i> <u>  HOUSE NUMBER  </u> </i>  </span> -{" "}{this.state.user2[0].house} </li>
 //     <li>   <span style={{color:"#004d1a"}} ><i> <u>Day Of Visit </u> </i> </span> - {" "}{this.state.user[0].birth} </li>
 //      <li> <span style={{color:"#004d1a"}} ><i><u> Shot Time Of Visit </u> </i>  </span> - {" "}{this.state.user[0].time}  </li>
 //     <li>   <span style={{color:"#004d1a"}} ><i> <u>Mobile No. </u> </i> </span> - {" "}{this.state.user[0].mobile} </li>
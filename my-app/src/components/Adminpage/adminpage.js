import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal,Spinner  } from 'react-bootstrap';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import * as s from './App.styles';
import Sidebar from '../Home/components/Sidebar/Sidebar';
import * as Palette from '../Home/colors';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [userlist, setUserlist] = useState([]);
   const [show, setShow] = useState(false);
   const [showW, setShowW] = useState(false);
   const [User,setUser] = useState(null);
   const [Loading,setLoading]=useState(false);
   const [colorr,setcolorr]=useState("preDark");
  const handleCloseW = () => {setShowW(false); setUser(null)};
  const handleShowW = (user) => {setShowW(true); setUser(user)};
   const handleClose = () => {setShow(false); setUser(null)};
  const handleShow = (user) => {setShow(true); setUser(user)};

  const handleAllow = () => {
    let id=`${User}`
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:9000/api/users/allowLogin/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        //console.log(res)
        NotificationManager.success(res.data.msg);
        let tempArr = [...userlist];
        const newUserlistt = tempArr.filter((ele) => ele._id !== id)
        setUserlist([...newUserlistt]); 
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.msg);
      });
  };
  const disableAllow = () => {
     let id=`${User}`
    const token = localStorage.getItem("token");
    axios
      .delete(
        `http://localhost:9000/api/users/allowLogin/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.msg)
        NotificationManager.success(res.data.msg);
        let arr=[...userlist];
        const newUserlist = arr.filter((ele) => ele._id !== id)
        setUserlist([...newUserlist])
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.msg);
      });
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    axios
      .get("http://localhost:9000/api/users/userlist", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
       let arr1=[...res.data.userlist];
        const newUser = arr1.filter((ele) => ele.canLogin === false)
        setUserlist([...newUser])
        setLoading(true)
      });
  }, []);
  
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
    return(
      <>
       <NotificationContainer />
         <s.App>
      <Sidebar
        backgroundImage={backgroundImage}
        sidebarHeader={sidebarHeader}
        menuItems={menuItems}
        fonts={fonts}
        colorPalette={Palette[`${colorr}`]
      }
       SELECTED="Pending REQ"
      />  
      <div className="p-4" style={{width:"100%"}}>
        <MDBTable className="py-3" hover>
          <MDBTableHead color="primary-color" textWhite>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Permissions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
          { Loading ? <div></div> : <div  style={{display: 'flex',marrginLeft:"90%",justifyContent: 'center'}} > 
       <Spinner animation="border" variant="danger" size="xl" />{ Loading ? <div></div> : <div  style={{display: 'flex',marrginLeft:"70%",justifyContent: 'center'}} > 
       <Spinner animation="border" variant="danger" size="xl" />
       </div>
     }{ Loading ? <div></div> : <div  style={{display: 'flex',marrginLeft:"80%",justifyContent: 'center'}} > 
       <Spinner animation="border" variant="danger" size="xl" />
       </div>
     }
       </div>
     }
            {userlist &&
              userlist.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <>
                      <MDBBtn
                        color="success"
                        size="sm"
                        style={{width:"127px"}}
                        onClick={() => handleShowW(user._id)}
                      >
                        Allow
                      </MDBBtn>

                      <MDBBtn
                        color="warning"
                        size="sm"
                        style={{width:"127px"}}
                        onClick={() => handleShow(user._id) }
                      >
                        DisAllow
                      </MDBBtn>
                     </> 
                                      </td>
                </tr>
              ))}

          </MDBTableBody>
        </MDBTable>
        </div>
         <div style={{postion:"absolute",zIndex:"1",
 gridGap:" 0px" , 
  gridTemplateRows: "50px 50px 50px 50px 50px" ,  display:"inline-grid",bottom:"40px",top:"0px",}}>
    <MDBBtn color="cyan" type="button" onClick={()=>{
      setcolorr("pinkAndBlue")}
     } >
      </MDBBtn>
      <MDBBtn color="green" type="button" onClick={()=>{
      setcolorr("swampy")}
     } >
      </MDBBtn>
      <MDBBtn color="blue" type="button" onClick={()=>{
      setcolorr("silver")}
     } >
                  
                  </MDBBtn>
          <MDBBtn color="pink" type="button" onClick={()=>{
      setcolorr("dejaVu")}
     } >
                  
                  </MDBBtn>
      <MDBBtn color="brown" type="button" onClick={()=>{
      setcolorr("brown")}
     } >
                  
                  </MDBBtn>  
                  </div>  
    </s.App>     
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton style={{background:"orange",color:"white"}}>
          <Modal.Title>Discard?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Do you want to Discard user permanently!?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Noo
          </Button>
          <Button variant="success" onClick={()=> { disableAllow(); handleClose()} }>Yess</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showW}
        onHide={handleCloseW}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton style={{background:"rgb(46, 99, 60)",color:"white"}}>
          <Modal.Title >Allow?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Do you want to Allow user permanently!?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseW}>
            Noo
          </Button>
          <Button variant="success" onClick={()=>{ handleAllow(); handleCloseW() } }>Yess</Button>
        </Modal.Footer>
      </Modal>
    </> 
  )
}

export default AdminPage;
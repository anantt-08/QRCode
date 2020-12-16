import QRCode from "qrcode.react";
import React, { Component } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { Container } from "reactstrap";
import { Tabs, Tab } from "react-bootstrap";
import Dialog from "react-bootstrap-dialog";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { MDBBtn
} from "mdbreact";
import * as s from './App.styles';
import Sidebar from '../Home/components/Sidebar/Sidebar';
import * as Palette from '../Home/colors'
import { FaRegTrashAlt } from "react-icons/fa";
import Fab from "@material-ui/core/Fab";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export default class Userlist extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      DATA: [],
      loading: false,
         colorr:"preDark"
    };
  }

  componentWillMount() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:9000/api/users/userlistt", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("userlisttt2");
        res.data.userlist.sort();
        this.setState({ DATA: [...res.data.userlist] });
        this.setState({ loading: true });
      });
  }

  deleteData = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:9000/api/users/allowLogin/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        NotificationManager.success(res.data.msg);
        this.componentWillMount();
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

  const fonts = {
    header: 'ZCOOL KuaiLe',
    menu: 'Poppins'
  }
    const columns = [
      {
        dataField: "_id",
        text: "Id",
        hidden: true,
        editable: false,
      },
      {
        dataField: "name",
        text: "UserName",
      },
      {
        dataField: "mobile",
        text: "MobileNo",
      },
      {
        dataField: "house",
        text: "HouseNo",
      },
      {
        dataField: "occupation",
        text: "Occupation",
      },
      {
        dataField: "birth",
        text: "BirthDate",
      },
      {
        dataField: "operation",
        text: "QR CODE",
        style: {
          width: 50,
        },
        editable: false,
        formatter: (cellContent, row) => (
          <div>
            <QRCode
              id={row._id}
              value={row._id}
              size={100}
              level={"H"}
              includeMargin={true}
            />
            <a
              onClick={() => {
                const canvas = document.getElementById(row._id);
                canvas.size="500";
                const pngUrl = canvas
                  .toDataURL("image/png")
                  .replace("image/png", "image/octet-stream");

                let downloadLink = document.createElement("a");
                downloadLink.href = pngUrl;
                downloadLink.download = row.name + ".png";
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
              }}
            >
              Download QR Code
            </a>
          </div>
        ),
      },
      {
        dataField: "operation",
        text: "Delete",
        style: {
          width: 10,
        },
        editable: false,
        formatter: (cellContent, row) => (
          <div>
            <Fab
              color="secondary"
              aria-label="delete"
              size="small"
              onClick={() => {
                this.dialog.show({
                  title: "Confirmation",
                  body: "Are you sure delete data?",
                  actions: [
                    Dialog.CancelAction(),
                    Dialog.OKAction(() => {
                      this.deleteData(row._id);
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
              <FaRegTrashAlt />
            </Fab>
          </div>
        ),
      },
    ];

    const pagination = paginationFactory({
  sizePerPage:3,
 sizePerPageList : [ {
  text: '3', value: 3
}, {
  text: '6', value: 6
},
{text: '10', value: 10
}
 ]

});

    //  this.componentWillMount();
    return (
      <>
        <NotificationContainer />
         <s.App>
      <Sidebar
        backgroundImage={backgroundImage}
        sidebarHeader={sidebarHeader}
        menuItems={menuItems}
        fonts={fonts}
        colorPalette={Palette[`${this.state.colorr}`]      }
       SELECTED="User List"
      />  
        <div style={{width:"100%", background: "#ecf0f1"}}>
          <Container className="mt-3">
            {this.state.loading ? (
              <div></div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Spinner animation="border" variant="danger" size="xl" />
                  <Spinner animation="border" variant="danger" size="xl" />  <Spinner animation="border" variant="danger" size="xl" />
              </div>
            )}
            <Tabs defaultActiveKey="view" id="uncontrolled-tab-example">
              <Tab eventKey="view" title="View">
                <BootstrapTable
                  keyField="_id"
                  data={this.state.DATA}
                  columns={columns}
                  hovers
                  pagination={pagination}

                />
              </Tab>
            </Tabs>
            <Dialog
              ref={(component) => {
                this.dialog = component;
              }}
            />
          </Container>
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

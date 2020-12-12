import QRCode from "qrcode.react";
import React, { Component } from "react";
import axios from "axios";
import { Spinner  } from 'react-bootstrap';
import {
    Container
} from "reactstrap";
import { Tabs, Tab } from "react-bootstrap";
import Dialog from "react-bootstrap-dialog";import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {  FaRegTrashAlt } from "react-icons/fa";
import Fab from "@material-ui/core/Fab";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export default class Userlist extends Component<any, any> {
    constructor ( props: any ) {
        super( props );

        this.state = {
            DATA: [],
            loading:false
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
           console.log("userlisttt2")
         res.data.userlist.sort();
         this.setState({DATA : [...res.data.userlist] });
         this.setState({loading:true}) 
      });
    }

   deleteData = (id) => {
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
        NotificationManager.success(res.data.msg);
        this.componentWillMount();
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.msg);
      });
  };

    render() {
            const columns = [
            {
                dataField: "_id",
                text: "Id",
                hidden: true,
                editable: false
            },
            {
                dataField: "name",
                text: "UserName"
            },
            {
                dataField: "mobile",
                text: "MobileNo"
            },
                        {
                dataField: "house",
                text: "HouseNo"
            },
                        {
                dataField: "occupation",
                text: "Occupation"
            },
                        {
                dataField: "birth",
                text: "BirthDate"
            },
            {
                dataField: "operation",
                text: "QR CODE",
                style: {
                    width: 50
                },
                editable: false,
                formatter: ( cellContent, row ) => (
                    <div>
  <QRCode
    id={row._id}
    value={JSON.stringify(row._id)}
    size={100}
    level={"H"}
    includeMargin={true}
  />
  <a onClick ={ () => {
  const canvas = document.getElementById(row._id);
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = row.name+".png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
} }
>
Download QR Code
</a>
</div>

                )
            },
            {
                dataField: "operation",
                text: "Delete",
                style: {
                    width: 10
                },
                editable: false,
                formatter: ( cellContent, row ) => (
                    <div>
                        <Fab
                            color="secondary"
                            aria-label="delete"
                            size="small"
                            onClick={ () => {
                                this.dialog.show( {
                                    title: "Confirmation",
                                    body: "Are you sure delete data?",
                                    actions: [
                                        Dialog.CancelAction(),
                                        Dialog.OKAction( () => {
                                            this.deleteData( row._id );
                                        } )
                                    ],
                                    bsSize: "small",
                                    onHide: dialog => {
                                        dialog.hide();
                                        console.log( "closed by clicking background." );
                                    }
                                } );
                            } }
                        >
                            <FaRegTrashAlt />
                        </Fab>
                    </div>
                )
            }
        ];
      //  this.componentWillMount();
        return (
          <>
      <NotificationContainer />    
            <div>
                <Container className="mt-3">
                  { this.state.loading ? <div></div> : <div  style={{display: 'flex', justifyContent: 'center'}} > 
       <Spinner animation="border" variant="danger" size="xl" />
       </div>
     }
                    <Tabs defaultActiveKey="view" id="uncontrolled-tab-example"                     
                    >
                        <Tab eventKey="view" title="View">

                            <BootstrapTable
                                keyField="_id"
                                data={ this.state.DATA }
                                columns={ columns }
                                hovers
                                pagination={ paginationFactory()
                                 }
                                
                            />
                        </Tab>
                    </Tabs>
                    <Dialog
                        ref={ component => {
                            this.dialog = component;
                        } }
                    />
                </Container>
            </div>
        </>
        );
    }
}  
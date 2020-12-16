import React ,{Component} from 'react';
import QRCode from "qrcode.react";
import Alert from '@material-ui/lab/Alert';
    // function RenderMenuItem ({dish}) {
    //     return (
    //       <Link to={`/menu/${dish._id}`} // activeClassName="active"
    //       >
    //         <Card> 
    //              <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
    //             <CardImgOverlay>
    //             <CardTitle>{dish.name}</CardTitle>
    //             </CardImgOverlay>
    //         </Card>
    //         </Link>
    //     );
    // }

class Relativepage extends Component {


  constructor(props) {
    super(props);
    this.state={
      bgcolor:"yellow",
      fgcolor:"black",
      size:270
    }
  }


  render() {
           const DownloadQr =() => {
  this.setState({
      bgcolor: "#FFFFFF",
      fgcolor:  "#000000",
      size:270
    });
   yoho();
}
const yoho = () =>{
  setTimeout(() => {
    const canvas = document.getElementById(this.props.id);
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = this.props.name+".png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  this.setState({
      bgcolor: "yellow",
      fgcolor:  "black",
      size:270
    });
       }, 1000);
  
}
    
    return (  
      <>
        <div>
        <div style={{display:"flex",justifyContent:"space-between"}}>          
         <QRCode
    id={this.props.id}
    value={this.props.id}
    size={this.state.size}
    level={"H"}
    includeMargin={true}
  bgColor={this.state.bgcolor}
  fgColor={this.state.fgcolor}
  />
  </div>
  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <u><a onClick={DownloadQr} style={{fontWeight:"bold",fontSize:"20px",color:"brown"}}>Download QRCode</a></u>
{this.props.already ? <Alert variant="filled" severity="warning" className="m-0" style={{width:"25%",position:"relative",bottom:"240px",left:"290px"}}>
   Already Registered QR CODE
  </Alert> :
<Alert variant="filled" severity="success" className="m-0" style={{width:"25%",position:"relative",bottom:"240px",left:"290px"}}>
   New Generated QR CODE
  </Alert>
}
  </div>
     </>
    );
  }
}    

    
export default Relativepage;  


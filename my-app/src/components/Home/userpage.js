import React ,{Component} from 'react';
import QRCode from "qrcode.react";
import { Button } from 'reactstrap';
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

class Homepage extends Component {


  constructor(props) {
    super(props);
  }


  render() {
           const DownloadQr =() => {
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
}
    
    return (    
        <div>
          
         <QRCode
    id={this.props.id}
    value={this.props.id}
    size={270}
    level={"H"}
    includeMargin={true}
  bgColor={"#0063B2FF"}
  fgColor={"#9CC3D5FF"}
  />
  <br /><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <u><a onClick={DownloadQr} style={{fontWeight:"bold",fontSize:"20px",color:"brown"}}>Download QRCode</a></u>
  </div>
     
    );
  }
}    

    
export default Homepage;  


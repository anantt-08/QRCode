import React, { Component } from "react";
import Dialog from "react-bootstrap-dialog";import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import QrReader from 'react-qr-reader'

class Scanuser extends Component {
  
  componentDidMount () {
    const script = document.createElement("script");

    script.src = "webqr.js";
    script.async = true;

    document.body.appendChild(script);

    const script1 = document.createElement("script");

    script1.src = "llqrcode.js";
    script1.async = true;

    document.body.appendChild(script1);

    const script2= document.createElement("script");

    script2.src = "https://apis.google.com/js/plusone.js";
    script2.async = true;

    document.body.appendChild(script2);
}
  render() {
    return (
      <div id="main">
<div id="header">
<p id="mp1">
QR Code scanner
</p>
<ul>
<li><a href="index.html">Scan</a></li>
<li><a href="create.html">Create</a></li>
<li><a href="about.html">About</a></li>
<li ><a href="contact.html">Contact</a></li>
</ul>
</div>
<div id="mainbody">
<table className="tsel" border="0" width="100%">
<tr>
<td valign="top" align="center" width="50%">
<table className="tsel" border="0">
<tr>
<td><img className="selector" id="webcamimg" src="./profile.jpg" onClick={()=>{setwebcam()}} align="left" /></td>
<td><img className="selector" id="qrimg" src="./profile.jpg" onClick={()=>{setimg()}} align="right"/></td></tr>
<tr><td colspan="2" align="center">
<div id="outdiv">
</div></td></tr>
</table>
</td>
</tr>
<tr><td colspan="3" align="center">
</td></tr>
<tr><td colspan="3" align="center">
<div id="result"></div>
</td></tr>
</table>
        </div>
      </div>
    )
  }
}


export default Scanuser;
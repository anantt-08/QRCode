import React from "react";
import {  Container, Row, Col } from "reactstrap";
import { Nav, NavItem, NavLink } from 'reactstrap';

class FrontPage extends React.Component {
  render() {
    return (
       <div>
           <title>QR Code Generator & Scanner</title>
    <header>
        <video autoplay muted loop id="myVideo">
            <source src="./vid/video.mp4" type="video/mp4" />
        </video>
        <nav>
            <h1 className="logo">QR</h1>
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#discover">Discover</a></li>
                <li><a href="#services">Our Services</a></li>
            </ul>
        </nav>
        <div>
            <h1>QR Code Generator & Scanner</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi officiis ipsum officia numquam expedita ullam.</p>
            <a href="">Get Started</a>
        </div>
    </header>
    <section id="about">
        *About section*
    </section>
    <section id="discover">
        *Discover section*
    </section>
    <section id="services">
        *Our Services section*
    </section>
        </div>
    );
  }
}

export default FrontPage;

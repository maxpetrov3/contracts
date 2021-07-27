import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'




class FooterComponent extends Component {
    render() {
        return (
            
            <Navbar bg="dark" variant="dark" sticky="bottom" fixed="bottom">
                <Navbar.Collapse className="justify-content-center">
                <Navbar.Text>
                <a>Всегда в движении</a>
                </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
            
        );
    }
}

export default FooterComponent;
import React, { Component } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import logo from '../Resources/logo.jpg'
var user = ""

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    headerBuilder() {
        user = JSON.parse(window.localStorage.getItem('user'))

        if (user.role === "USER") {

            return (
                <Nav className="mr-auto">
                    <Nav.Link href="/contracts">Все договоры</Nav.Link>
                    <Nav.Link href="/myContracts">Мои договоры</Nav.Link>
                    <Nav.Link href="/allTasks">Календарный график</Nav.Link>
                </Nav>
            );
        } else {
            return (
                <Nav className="mr-auto">
                    <Nav.Link href="/userAdmin">Пользователи</Nav.Link>
                    <Nav.Link href="/directions">Справочники</Nav.Link>
                </Nav>
            );
        }
    }

    logout() {
        window.localStorage.setItem('user', JSON.stringify(""));
        window.localStorage.setItem('hasUserAccess', JSON.stringify(false));
        this.props.history.push("/login")

    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top" fixed="top">
                <Navbar.Brand href="/contracts">
                    <img src={logo} width = "40" className="mr-2"></img>
                    ЛУКОЙЛ-Нижневолжскнефть
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {this.headerBuilder()}
                </Navbar.Collapse>
                <Navbar.Text>
                    <Form inline>
                        {user.ex_name}
                        <button className="btn btn-outline-danger ml-3"
                            onClick={() => this.logout()}
                        >Выход</button>
                    </Form>
                </Navbar.Text>
            </Navbar>
        );
    }
}

export default Header;
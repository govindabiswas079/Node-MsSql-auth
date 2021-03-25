import React from 'react';
import { Navbar, Nav } from "react-bootstrap";
import Context from "./context";
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.png"
const NavB = (props) => {
    return (
        <Context.Consumer>
            {value =>
                <Navbar bg="white" variant="light" className="shadow-sm border" expand="md">
                    <Navbar.Toggle aria-controls="collapse" />
                    <Navbar.Brand href="#home">
                        <img
                            alt="logo"
                            src={Logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
      Canvas Project
    </Navbar.Brand>
                    <Navbar.Collapse id="collapse" className="justify-content-end">
                        <Nav>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                            </Nav.Item>
                      
                            {value.isAuthorized ?
                                <>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="/panel">Panel</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#logout" onClick={value.unAuthorize}>Logout</Nav.Link>
                                    </Nav.Item>
                                 
                        
                                </> :
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                </Nav.Item>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>}
        </Context.Consumer>
    );
}
export default NavB;
import React from 'react'
import {Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
            <Container>
            <Navbar.Brand><img src={logo} alt="logo" height="45"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">
                    <Nav.Link>Home <i className="fa-brands fa-fort-awesome"></i></Nav.Link>
                    <Nav.Link>Sign in <i className="fa-solid fa-arrow-right-to-bracket"></i></Nav.Link>
                    <Nav.Link>Sign up <i className="fa-solid fa-user-plus"></i></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar
import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

import { useState } from "react";
import Alert from "react-bootstrap/Alert";
const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const [showSuccess, setShowSuccess] = useState(false);
    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
          await axios.post("dj-rest-auth/logout/");
          setShowSuccess(true); 
          setCurrentUser(null);
            setTimeout(() => {
                setShowSuccess(false); 
            }, 3000);
            
          
        } catch (err) {
          console.log(err);
        }
      };

    const adPostIcon = (
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/playdate/create"><i className="fa-solid fa-square-plus"></i>Add Playdate</NavLink>
    )
    const loggedInIcons = <>
    
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/myplaydate">My Playdates <i className="fa-solid fa-child-reaching"></i></NavLink>
        <NavLink className={styles.NavLink} 
            to="/" 
            onClick ={handleSignOut}
        > Log out
            <i className="fa-solid fa-arrow-right-from-bracket"></i>       
        </NavLink>
        <span className={styles.NavLink}>Signed in as: {currentUser?.username}<i className="fa-solid fa-baby"></i></span>
    </>;
    const loggedOutIcons = (
        <>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">Sign in <i className="fa-solid fa-arrow-right-to-bracket"></i></NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">Sign up <i className="fa-solid fa-user-plus"></i></NavLink>
        </>
    );
    return (
        <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
            <Container>
            {showSuccess && (
                <Alert variant="success">
                    <p>You have successfully signed out.</p>
                </Alert>
            )}
                <NavLink to="/">
                    <Navbar.Brand><img src={logo} alt="logo" height="45" /></Navbar.Brand>
                </NavLink>
                {currentUser && adPostIcon}
                <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                    <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">Playdates <i className="fa-solid fa-children"></i></NavLink>
                        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/contact">Contact <i className="fa-regular fa-pen-to-square"></i></NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar
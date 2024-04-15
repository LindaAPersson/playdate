import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
          await axios.post("dj-rest-auth/logout/");
          setCurrentUser(null);
        } catch (err) {
          console.log(err);
        }
      };

    const adPostIcon = (
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts/create"><i className="fa-solid fa-square-plus"></i>Add Playdate</NavLink>
    )
    const loggedInIcons = <>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/playdate">Playdates <i className="fa-solid fa-children"></i></NavLink>
        <NavLink className={styles.NavLink} 
            to="/" 
            onClick ={handleSignOut}
        > Log out
            <i className="fa-solid fa-arrow-right-from-bracket"></i>       
        </NavLink>
        Signed in as: {currentUser?.username}
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
                <NavLink to="/">
                    <Navbar.Brand><img src={logo} alt="logo" height="45" /></Navbar.Brand>
                </NavLink>
                {currentUser && adPostIcon}
                <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                    <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">Home <i className="fa-brands fa-fort-awesome"></i></NavLink>
                        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/contact">Contact <i className="fa-regular fa-pen-to-square"></i></NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar
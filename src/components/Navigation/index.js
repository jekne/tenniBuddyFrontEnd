import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export default function Navigation() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar className="colorNavBar">
      <Navbar.Brand as={NavLink} to="/">
        <strong>
          {" "}
          <strong className="tennisBuddyLogo"> TENNIS BUDDY 🎾 </strong>
        </strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          {" "}
          <NavbarItem path="/" linkText="🎾 Home 🎾" />
          {!token ? (
            ""
          ) : (
            <>
              <NavbarItem path="/clubs" linkText="🎾 Clubs 🎾" />
              <NavbarItem path="/levels" linkText="🎾 Levels 🎾" />
              <NavbarItem path="/chats" linkText="🎾 Chat 🎾" />
              {/* <NavbarItem path="/matches" linkText="🎾 Matches 🎾" /> */}
              <NavbarItem path="/uprofile" linkText="🎾 Your Profile 🎾" />
            </>
          )}
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

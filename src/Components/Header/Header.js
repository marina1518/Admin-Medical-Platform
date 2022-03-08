import React from "react";
import "./Header.css";

import "bootstrap/dist/css/bootstrap.min.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
//import { Container, Navbar, Nav } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin, logout } from "../../actions";
import { chart } from "../../actions";
// import { Button, Badge } from "react-bootstrap";

const Header = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const token = useSelector((state) => state.auth); //state of token
  const initstate = () => {
    ////GO BACK ALL STATES TO INIT STATES
    dispatch(logout());
    dispatch(chart());
    navigate("/");
  };
  const [showNav, setShowNav] = useState(false);
  const linksContainerRef = useRef(null);
  const loginContainerRef = useRef(null);
  const linksRef = useRef(null);
  const loginRef = useRef(null);

  const handlerouting = (type) => {
    if (type === "owner") {
      navigate("/appadmin");
    } else if (type === "user") {
      navigate("/user");
    } else if (type === "c_admin") {
      navigate("/clinicdoctor");
    } else if (type === "p_admin") {
      navigate("/pharmacyadmin");
    } else if (type === "h_admin") {
      navigate("/hospitaladmin");
    } else if (type === "doctor") {
      navigate("/doctor");
    }
  };

  /*useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    const loginHeight = loginRef.current.getBoundingClientRect().height;
    console.log(linksHeight);
    if (showNav) {
      //   const total = linksHeight + loginHeight;
      linksContainerRef.current.style.height = `${linksHeight}px`;
      loginContainerRef.current.style.height = `${loginHeight + 30}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
      loginContainerRef.current.style.height = "0px";
    }
  }, [showNav]); // so for every time showNav changed useEffect will run*/

  return (
    <nav>
      <div className="nav-center"> 
          <div className="login-container" ref={loginContainerRef}>
            {/* <div className="profile-icon"> */}
           <ul className="login-data" ref={loginRef}>
              <li
                className="profile-icon"
                onClick={() => {
                  handlerouting(token.usertype);
                }}
              >
                <div className="icon-circle">
                  <Badge color="primary" badgeContent={2} showZero>
                    <AccountCircleIcon />
                  </Badge>
                </div>
              </li>
              <li className="logout" onClick={initstate}>
                Logout
              </li>
             
            </ul>
            </div>
           
          </div>
        
 </nav>
  );
};

export default Header;

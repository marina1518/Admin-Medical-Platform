import React from "react";
import "./Header.css";
import Avatar from '@material-ui/core/Avatar';
import "bootstrap/dist/css/bootstrap.min.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
//import { Container, Navbar, Nav } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin, logout } from "../../actions";
import { chart } from "../../actions";
import MenuIcon from "@mui/icons-material/Menu";
// import { Button, Badge } from "react-bootstrap";

const Header = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const token = JSON.parse(useSelector((state) => state.auth)); //state of token
  console.log(token);
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

  useEffect(() => {
    const loginHeight = loginRef.current.getBoundingClientRect().height;
    if (showNav) {
      loginContainerRef.current.style.height = `${loginHeight + 30}px`;
    } else {
      loginContainerRef.current.style.height = "0px";
    }
  }, [showNav]);

  return (
    <nav>
      {/* {!token.token ? ( */}
      <div className="nav-center">
        <div className="nav-header">
          <button className="nav-toggle" onClick={() => setShowNav(!showNav)}>
            {/* <i class="bi bi-list"></i> */}
            <MenuIcon />
          </button>
        </div>
        <div className="login-container" ref={loginContainerRef}>
          <ul className="links login-data" ref={loginRef}>
            <li
              className="profile-icon"
              onClick={() => {
                handlerouting(token.role);
              }}
            >
              <div className="icon-circle">
                <Badge color="primary" badgeContent={2} overlap="circular" >
                    <Avatar  style={{height:'40px',width:'40px'}} src={token.profilePic}  />
                </Badge>
              </div>
            </li>
            <li className="logout" onClick={initstate}>
              Logout
            </li>
          </ul>
        </div>
      </div>
      {/* ) : (
        <></>
      )} */}
    </nav>
  );
};

export default Header;

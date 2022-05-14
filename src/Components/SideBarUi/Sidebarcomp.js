import React, { useState, useEffect } from "react";
import SideBarUI from "./Sidebar";
import "./Sidebarcomp.css";
import "./Sidebar.css";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsInfoCircleFill } from "react-icons/bs";
import { AiFillClockCircle, AiFillCarryOut } from "react-icons/ai";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import LocalPharmacyIcon from "@material-ui/icons/LocalPharmacy";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import DashboardIcon from "@material-ui/icons/Dashboard";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import Tooltip from "@mui/material/Tooltip";
//import { blueGrey } from "@material-ui/core/colors";

import { useSelector, useDispatch } from "react-redux";
import {
  hospitals,
  clinics,
  announcments,
  pharmacies,
  chart,
  appointments,
  orders,
  info,
} from "../../actions";

export default function Sidebarcomp(props) {
  const dispatch = useDispatch();
  const token = JSON.parse(useSelector((state) => state.auth)); //state of token
  console.log(token);
  const [compact, setCompact] = useState(false);

  const compacthandler = () => {
    setCompact(!compact);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1065) {
        setCompact(true);
      } else if (window.innerWidth > 1065) {
        setCompact(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Code of CompactName
  let compactName = "";
  const CompactNameHandler = (name) => {
    const spaceCondition = name.includes(" ");
    if (!spaceCondition) {
      compactName = name[0].toUpperCase();
    } else {
      const spaceIndex = name.indexOf(" ");
      console.log(spaceIndex);
      compactName = (name[0] + name[spaceIndex + 1]).toUpperCase();
    }
    return <h3>{compactName}</h3>;
  };

  return (
    <SideBarUI compact={compact} oncompact={compacthandler}>
      {
        <div>
          <div className="image-container">
            {/*<Avatar
              className="profile_img"
              src={token.profilePic}
              sx={{ width: 50, height: 50 }}
        />*/}
            <Avatar
              className="profile_img"
              style={{ height: "70px", width: "70px" }}
              src={token.profilePic}
            />

            {compact ? (
              CompactNameHandler(token.username)
            ) : (
              <h3>{token.username}</h3>
            )}
          </div>
        </div>
      }
      {props.page === "entity" && (
        <div className="sidebar-links">
          {compact ? (
            <>
              <Tooltip title="Personnal Info" placement="right">
                <li onClick={() => props.sideBarhandler("Info")}>
                  <i>
                    <AnnouncementIcon htmlColor="#06a3da" />
                  </i>
                </li>
              </Tooltip>
              <Tooltip title="Doctors" placement="right">
                <li onClick={() => props.sideBarhandler("Doctors")}>
                  <i>
                    <MedicalServicesIcon />
                  </i>
                </li>
              </Tooltip>
              <Tooltip title="Appointments" placement="right">
                <li onClick={() => props.sideBarhandler("Appointments")}>
                  <i>
                    <AccessTimeIcon />
                  </i>
                </li>
              </Tooltip>
            </>
          ) : (
            <>
              <li onClick={() => props.sideBarhandler("Info")}>
                <i>
                  <AnnouncementIcon htmlColor="#06a3da" />
                </i>
                <span> Personnal Info</span>
              </li>
              <li onClick={() => props.sideBarhandler("Doctors")}>
                <i>
                  <MedicalServicesIcon />
                </i>
                <span> Doctors</span>
              </li>
              <li onClick={() => props.sideBarhandler("Appointments")}>
                <i>
                  <AccessTimeIcon />
                </i>
                <span> Appointments</span>
              </li>
            </>
          )}
        </div>
      )}
      {props.page === "app" && (
        <div className="sidebar-links">
          {compact ? (
            <>
              <Tooltip title="Personnal Info" placement="right">
                <li
                  onClick={() => {
                    dispatch(info());
                  }}
                >
                  <i>
                    <AnnouncementIcon htmlColor="#06a3da" />
                  </i>
                </li>
              </Tooltip>
              <Tooltip title="Dashboard" placement="right">
                <li
                  onClick={() => {
                    dispatch(chart());
                  }}
                >
                  <i>
                    <DashboardIcon htmlColor="#06a3da" />
                  </i>
                </li>
              </Tooltip>
              <Tooltip title="Hospitals" placement="right">
                <li
                  onClick={() => {
                    dispatch(hospitals());
                  }}
                >
                  <i>
                    {" "}
                    <LocalHospitalIcon htmlColor="#06a3da" />
                  </i>
                  {compact ? "" : <span> Hospitals</span>}
                </li>
              </Tooltip>
              <Tooltip title="Clinics" placement="right">
                <li
                  onClick={() => {
                    dispatch(clinics());
                  }}
                >
                  <i>
                    <LocalHospitalIcon htmlColor="#06a3da" />
                  </i>
                </li>
              </Tooltip>
              <Tooltip title="Pharmacies" placement="right">
                <li
                  onClick={() => {
                    dispatch(pharmacies());
                  }}
                >
                  <i>
                    <LocalPharmacyIcon htmlColor="#06a3da" />
                  </i>
                </li>
              </Tooltip>
              <Tooltip title="Announcements" placement="right">
                <li
                  onClick={() => {
                    dispatch(announcments());
                  }}
                >
                  <i>
                    <AnnouncementIcon htmlColor="#06a3da" />
                  </i>
                </li>
              </Tooltip>
              <Tooltip title="Appointments" placement="right">
                <li
                  onClick={() => {
                    dispatch(appointments());
                  }}
                >
                  <i>
                    <AccessTimeIcon />
                  </i>
                </li>
              </Tooltip>
              <Tooltip title="orders" placement="right">
                <li
                  onClick={() => {
                    dispatch(orders());
                  }}
                >
                  <i>
                    <VaccinesIcon htmlColor="#06a3da" />
                  </i>
                </li>
              </Tooltip>
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  dispatch(info());
                }}
              >
                <i>
                  <AnnouncementIcon htmlColor="#06a3da" />
                </i>
                <span> Personnal Info</span>
              </li>
              <li
                onClick={() => {
                  dispatch(chart());
                }}
              >
                <i>
                  <DashboardIcon htmlColor="#06a3da" />
                </i>
                <span> Dashboard</span>
              </li>
              <li
                onClick={() => {
                  dispatch(hospitals());
                }}
              >
                <i>
                  <LocalHospitalIcon htmlColor="#06a3da" />
                </i>
                <span> Hospitals</span>
              </li>

              <li
                onClick={() => {
                  dispatch(clinics());
                }}
              >
                <i>
                  <LocalHospitalIcon htmlColor="#06a3da" />
                </i>
                <span> Clinics</span>
              </li>

              <li
                onClick={() => {
                  dispatch(pharmacies());
                }}
              >
                <i>
                  <LocalPharmacyIcon htmlColor="#06a3da" />
                </i>
                <span> Pharmacies</span>
              </li>

              <li
                onClick={() => {
                  dispatch(announcments());
                }}
              >
                <i>
                  <AnnouncementIcon htmlColor="#06a3da" />
                </i>
                <span> Announcements</span>
              </li>
              <li
                onClick={() => {
                  dispatch(appointments());
                }}
              >
                <i>
                  <AccessTimeIcon />
                </i>
                <span> Appointments</span>
              </li>
              <li
                onClick={() => {
                  dispatch(orders());
                }}
              >
                <i>
                  <VaccinesIcon htmlColor="#06a3da" />
                </i>
                <span> orders </span>
              </li>
            </>
          )}
        </div>
      )}
    </SideBarUI>
  );
}

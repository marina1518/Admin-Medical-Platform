import React, { useState, useEffect } from "react";
import { BiMessageDetail } from "react-icons/bi";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../actions";
import { history } from "../../actions";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import {useLocation} from "react-router-dom";

const History = (props) => {
  const location = useLocation();
  console.log(props.user);
  // Floating Buttons Code
  const labels = [
    "Surgeries",
    "Diseases - allergies",
    "Family history",
    "Medications",
  ];

  const a11yProps = (index) => {
    return {
      id: `action-tab-${index}`,
      "aria-controls": `action-tabpanel-${index}`,
    };
  };

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
console.log("value", value);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div className="card">
      <div className="card-header bg-transparent border-0">
        <h3 className="mb-0">
          <BiMessageDetail /> History
        </h3>
      </div>
      <div className="card-body pt-2">
        <Box
          sx={{
            // bgcolor: "background.paper",
            bgcolor: "transparent",
            width: "100%",
            position: "relative",
            minHeight: 200,
            fontWeight: "bold",
            fontSize: 19,
          }}
        >
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              {labels.map((eachlabel, index) => (
                <Tab
                  key={index}
                  label={eachlabel}
                  {...a11yProps({ index })}
                  sx={{
                    fontWeight: "bold",
                  }}
                />
              ))}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
               <p>{props.history.surgeries}</p>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <p>
                 {props.history.diseases }
              </p>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <p>
                {props.history.family_history}
              </p> 
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <p>
                { props.history.medications }
              </p>
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>
    </div>
  );
};
export default History;
import React, { useEffect, useState } from "react";
import "./profile.css";
import {
  Button,
  ButtonGroup,
  Stack,
  Tab,
  Tabs,
  Accordion,
  Col,
  Row,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdOutlineDoneOutline, MdOutlineDone, MdCancel } from "react-icons/md";
import Avatar from "@material-ui/core/Avatar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SideBarUI from "../../Components/SideBarUi/Sidebar";
import { blueGrey } from "@material-ui/core/colors";
import Tooltip from "@mui/material/Tooltip";
import {
  pharmacy_info,
  pharma_history,
  orders_pharma,
  pending_orders_red,
  approved_orders,
} from "../../actions/index";
import { AiOutlineComment } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import EditIcon from "@material-ui/icons/Edit";
import { signin } from "../../actions/index";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Firebase";
import ModalImage from "react-modal-image";
// import { Bar} from "react-chartjs-2";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {logout} from '../../actions';

const Ph_admin = () => {
  const dispatch = useDispatch();

  const chosencomp = useSelector((state) => state.Pharmacy_reducer);
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
  const location = useLocation();
  const [Docid, setdoctorid] = useState(location.state ? location.state : "");
  console.log(Docid);
  const token = JSON.parse(useSelector((state) => state.auth));
  console.log(token.token);
  const token_copy = token;
  const [state, setstate] = useState(null);
  const [edit_photo, setEdit_photo] = useState(false);
  // const [neworders,setneworders]=useState(orders);
  var [phorder, setphorder] = useState([]);
  const [order2_details, setorder2_details] = useState([]);
  const [pending_orders, setpending_details] = useState([]);
  var order_list = JSON.parse(JSON.stringify(phorder));
  var order_details = {};
  const config = { headers: { Authorization: `Bearer ${token.token}` } };
  const Get_orders_Api = async () => {
    try {
      const res = await axios.get(
        `https://future-medical.herokuapp.com/admin/orders/pending`,
        config
      );
      const data = await res.data;
      console.log(data);
      if (data == "there is no pending orders") {
        return;
      }
      data.forEach((x) => {
        order_details.form = x.order_data.form;
        //let b=x.order_data.Date.split("T")
        order_details.Date = x.order_data.Date.split('T')[0].split('-').reverse().join("-");
        order_details.address = x.order_data.address;
        order_details.phone = x.order_data.phone;
        order_details.price = x.price;
        order_details.username = x.user.username;
        order_details.email = x.user.email;
        order_details.id = x._id;
        order_details.flag = x.flag;
        if (order_details.flag === "text") {
          order_details.form = JSON.parse(order_details.form);
        }
        order_list.push(order_details);
        console.log(order_details);
        order_details = {};
        console.log(order_details);
      });
      setorder2_details(order_list);
    } catch (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/")
        }
      }
  //console.error(error);
}
  };
  const [phorder2, setphorder2] = useState([]);
  var order_list2 = JSON.parse(JSON.stringify(phorder2));
  order_details = {};
  const Get_pending_Api = async () => {
    try {
      const res = await axios.get(
        `https://future-medical.herokuapp.com/admin/orders/approved`,
        config
      );
      const data = await res.data;
      console.log(order_list2);
      console.log(data);
      if (data == "there is no approved orders") {
        return;
      }
      data.forEach((x) => {
        order_details.form = x.order_data.form;
        //let b = x.order_data.Date.split('T')[0].split('-').reverse().join("-");
        order_details.Date = x.order_data.Date.split('T')[0].split('-').reverse().join("-");
        order_details.address = x.order_data.address;
        order_details.phone = x.order_data.phone;
        order_details.price = x.price;
        order_details.username = x.user.username;
        order_details.email = x.user.email;
        order_details.id = x._id;
        order_details.flag = x.flag;
        if (order_details.flag === "text") {
          order_details.form = JSON.parse(order_details.form);
        }
        order_list2.push(order_details);
        console.log(order_details);
        order_details = {};
        console.log(order_details);
      });
      setpending_details(order_list2);
      console.log(pending_orders);
    } catch (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/")
        }
      }
  //console.error(error);
}
  };
  const [approved, setapproved] = useState([]);
  const [phorder3, setphorder3] = useState([]);
  var order_list3 = JSON.parse(JSON.stringify(phorder3));
  order_details = {};
  const Get_approved_Api = async () => {
    try {
      const res = await axios.get(
        `https://future-medical.herokuapp.com/admin/orders/preparing`,
        config
      );
      const data = await res.data;
      console.log(order_list3);
      console.log(data);
      if (data == "there is no preparing orders") {
        return;
      }
      data.forEach((x) => {
        order_details.form = x.order_data.form;
        //let b = x.order_data.Date.split("T");
        order_details.Date = x.order_data.Date.split('T')[0].split('-').reverse().join("-");;
        order_details.address = x.order_data.address;
        order_details.phone = x.order_data.phone;
        order_details.price = x.price;
        order_details.username = x.user.username;
        order_details.id = x._id;
        order_details.email = x.user.email;
        order_details.flag = x.flag;
        if (order_details.flag === "text") {
          order_details.form = JSON.parse(order_details.form);
        }
        order_list3.push(order_details);
        console.log(order_details);
        order_details = {};
        console.log(order_details);
      });
      setapproved(order_list3);
      console.log(approved);
    } catch (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/")
        }
      }
  //console.error(error);
}
  };
  const [history, sethistory] = useState([]);
  const [phorder4, setphorder4] = useState([]);
  var order_list4 = JSON.parse(JSON.stringify(phorder4));
  order_details = {};
  const Get_history_Api = async () => {
    try {
      const res = await axios.get(
        `https://future-medical.herokuapp.com/admin/orders/history`,
        config
      );
      const data = await res.data;
      console.log(order_list4);
      console.log(data);
      if (data == "there is no delivered orders") {
        return;
      }
      data.forEach((x) => {
        order_details.form = x.order_data.form;
        //let b = x.order_data.Date.split("T");
        order_details.Date = x.order_data.Date.split('T')[0].split('-').reverse().join("-");
        order_details.address = x.order_data.address;
        order_details.phone = x.order_data.phone;
        order_details.price = x.price;
        order_details.username = x.user.username;
        order_details.email = x.user.email;
        order_details.id = x._id;
        order_details.status = x.status;
        order_details.flag = x.flag;
        if (order_details.flag === "text") {
          order_details.form = JSON.parse(order_details.form);
        }
        order_list4.push(order_details);
        console.log(order_details);
        order_details = {};
        console.log(order_details);
      });
      sethistory(order_list4);
      console.log(history);
    } catch (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/")
        }
      }
  //console.error(error);
}
  };
  useEffect(() => {
    Get_orders_Api();
    Get_approved_Api();
    Get_history_Api();
    Get_pending_Api();
  }, []);

  //edit
  const Edit_personal_info = async (info) => {
    try {
      const res = await axios.patch(
        "https://future-medical.herokuapp.com/admin/edit",
        info,
        config
      );
      console.log(info);
      alert(res.data);
      console.log(res.data);
    } catch (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/")
        }
      }
  //console.error(error);
}
  };

  const [username, setusername] = useState(null);
  const [email, setemail] = useState(null);
  const [phone, setphone] = useState(null);
  const [address, setaddress] = useState(null);
  const [edit, setEdit] = useState(false);
  const [phone_error, setphone_error] = useState("");
  const [ph_name, setph_name] = useState(null);
  const [temp, edit_pic_temp] = useState(null);
  const editted = {};
  var Edit_data = {};
  const setdata = () => {
    editted.username = username;
    editted.phone = phone;
    editted.email = email;
    editted.address = address;
    editted.ph_name = ph_name;
    editted.file = temp;
    if (editted.username === null) {
      Edit_data.admin_username = token.username;
    } else {
      Edit_data.admin_username = editted.username;
      token_copy.username = editted.username;
    }
    if (editted.ph_name === null) {
      Edit_data.entity_name = token.entity.name;
    } else {
      Edit_data.entity_name = editted.ph_name;
      token_copy.entity.name = editted.ph_name;
    }
    if (editted.address === null) {
      Edit_data.entity_address = token.entity.address;
    } else {
      Edit_data.entity_address = editted.address;
      token_copy.entity.address = editted.address;
    }
    if (editted.email === null) {
      Edit_data.admin_email = token.email;
    } else {
      Edit_data.admin_email = editted.email;
      token_copy.email = editted.email;
    }
    if (editted.phone === null) {
      Edit_data.entity_telephone = token.entity.telephone;
    } else {
      if (editted.phone.length === 11) {
        Edit_data.entity_telephone = editted.phone;
        token_copy.entity.telephone = editted.phone;
      } else {
        setphone_error("invalid phone number");
      }
    }
    if (editted.file === null) {
      Edit_data.admin_profilePic = token.profilePic;
      Edit_data.role = "p_admin";
      dispatch(signin(token_copy));
      Edit_personal_info(Edit_data);
    } else {
      console.log(editted.file);
      console.log(editted.file.name);

      const storageRef = ref(storage, `/files/${editted.file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, editted.file);
      uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            Edit_data.admin_profilePic = url;
            token_copy.profilePic = url;
            Edit_data.role = "p_admin";
            dispatch(signin(token_copy));
            Edit_personal_info(Edit_data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
    //console.log(Edit_data.admin_profilePic);
    //dispatch(signin(token_copy));
    //Edit_data.role = "p_admin";
    //console.log(Edit_data.entity_telephone);
    //Edit_personal_info(Edit_data);
    Edit_data = {};
    setEdit(false);
    setphone_error("");
  };

  const [price, setPrice] = useState("");
  const [comment, setComment] = useState("");
  const Approve_api = async (id, price, comment) => {
    try {
      const res = await axios.patch(
        `https://future-medical.herokuapp.com/admin/order/approve`,
        { id: id, price: price, comment: comment },
        config
      );
      const data = await res.data;
      alert("Order Approved");
      var new_orders = [];
      for (var i = 0; i < order2_details.length; i++) {
        if (order2_details[i].id !== id) new_orders.push(order2_details[i]);
        //else if(order2_details[i].id === id) pending_orders.push(order2_details[i]);
      }
      Get_pending_Api();
      console.log(new_orders);
      setorder2_details(new_orders);
      console.log(data);
    } catch (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/")
        }
      }
  //console.error(error);
}
  };
  const Done_Api = async (id) => {
    try {
      const res = await axios.patch(
        `https://future-medical.herokuapp.com/admin/order/done`,
        { id: id },
        config
      );
      const data = await res.data;
      alert("Order Dilevered");
      var new_orders = [];
      for (var i = 0; i < approved.length; i++) {
        if (approved[i].id !== id) new_orders.push(approved[i]);
        //else if(approved[i].id === id) history.push(approved[i]);
      }
      Get_history_Api();
      console.log(new_orders);
      setapproved(new_orders);
      console.log(data);
    } catch (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/")
        }
      }
  //console.error(error);
}
  };
  const disapprove_order = async (id, comment_api) => {
    try {
      const res = await axios.patch(
        `https://future-medical.herokuapp.com/admin/order/disapprove`,
        { id: id, comment: comment_api },
        config
      );
      const data = await res.data;
      console.log(data);
      alert("Order disapproved");
      // const newp = order2_details.filter((item)=> item.id !== id );
      // //remove(id,order2_details);
      // setorder2_details(newp);
      var new_orders = [];
      for (var i = 0; i < order2_details.length; i++) {
        if (order2_details[i].id !== id) new_orders.push(order2_details[i]);
        //else if(order2_details[i].id === id) history.push(order2_details[i]);
      }
      Get_history_Api();
      console.log(new_orders);
      setorder2_details(new_orders);
      console.log(order2_details);
    } catch (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/")
        }
      }
  //console.error(error);
}
  };

  let compactName = "";
  const CompactNameHandler = () => {
    const spaceCondition = token.username.includes(" ");
    if (!spaceCondition) {
      compactName = token.username[0].toUpperCase();
    } else {
      const spaceIndex = token.username.indexOf(" ");
      console.log(spaceIndex);
      compactName = (
        token.username[0] + token.username[spaceIndex + 1]
      ).toUpperCase();
    }
    return <h3>{compactName}</h3>;
  };

  return (
    <div className="main-container">
      <SideBarUI compact={compact} oncompact={compacthandler}>
        <div>
          <div className="image-container">
            <Avatar
              className="profile_img"
              src={token.profilePic}
              style={{ height: "70px", width: "70px" }}
              sx={{ bgcolor: blueGrey[400] }}
            />
            {compact ? CompactNameHandler() : <h3>{token.username}</h3>}
          </div>
        </div>
        <div className="sidebar-links">
          {compact ? (
            <>
              <Tooltip title="Personnal Info" placement="right">
                <li onClick={() => dispatch(pharmacy_info())}>
                  <i class="bi bi-info-circle-fill"></i>
                </li>
              </Tooltip>
              {token.entity.active ? (
                <Tooltip title="Orders" placement="right">
                  <li onClick={() => dispatch(orders_pharma())}>
                    <i class="bi bi-chat-left-text-fill"></i>
                  </li>
                </Tooltip>
              ) : (
                ""
              )}

              <Tooltip title="Pending Orders" placement="right">
                <li onClick={() => dispatch(pending_orders_red())}>
                  <i class="bi bi-clock-fill"></i>
                </li>
              </Tooltip>
              <Tooltip title="Approved Orders " placement="right">
                <li onClick={() => dispatch(approved_orders())}>
                  <i class="bi bi-bandaid-fill"></i>
                </li>
              </Tooltip>
              <Tooltip title="History" placement="right">
                <li onClick={() => dispatch(pharma_history())}>
                  <i class="bi bi-hourglass-split"></i>
                </li>
              </Tooltip>
            </>
          ) : (
            <>
              <li onClick={() => dispatch(pharmacy_info())}>
                <i class="bi bi-info-circle-fill"></i>
                <span> Pharmacy Info </span>
              </li>
              <li onClick={() => dispatch(orders_pharma())}>
                <i class="bi bi-chat-left-text-fill"></i>
                <span> Orders </span>
              </li>
              <li onClick={() => dispatch(pending_orders_red())}>
                <i class="bi bi-clock-fill"></i>
                <span> Pending Orders </span>
              </li>
              <li onClick={() => dispatch(approved_orders())}>
                <i class="bi bi-bandaid-fill"></i>
                <span> Approved Orders </span>
              </li>
              <li onClick={() => dispatch(pharma_history())}>
                <i class="bi bi-hourglass-split"></i>
                <span> History </span>
              </li>
            </>
          )}
        </div>
      </SideBarUI>
      <main>
        <div className="profile-container">
          {chosencomp == "pharmacy_info" ? (
            <div className="card">
              <div className="card-header bg-transparent">
                <h3 className="mb-0">
                  <BsInfoCircleFill /> Personal Information
                  {token.entity.active ? (
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={(e) => setEdit(true)}
                    ></EditIcon>
                  ) : (
                    ""
                  )}
                </h3>
              </div>
              <div className="card-body pt-0">
                <div className="row personnal-image">
                  <Avatar
                    className="profile_img"
                    src={token.profilePic}
                    style={{ height: "150px", width: "150px" }}
                    sx={{ bgcolor: blueGrey[400] }}
                  />
                  {edit ? (
                    <>
                      <input
                        className="edit-photo"
                        type="file"
                        onChange={(e) => edit_pic_temp(e.target.files[0])}
                      ></input>
                    </>
                  ) : (
                    ""
                  )}
                  {edit ? (
                    <input
                      style={{ cursor: "pointer" }}
                      placeholder={token.username}
                      type="text"
                      onChange={(e) => setusername(e.target.value)}
                    ></input>
                  ) : (
                    <h3 style={{ textAlign: "center" }}>{token.username}</h3>
                  )}
                </div>
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Pharmacy Name</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {edit ? (
                      <input
                        style={{ cursor: "pointer" }}
                        placeholder={token.entity.name}
                        type="text"
                        onChange={(e) => setph_name(e.target.value)}
                      ></input>
                    ) : (
                      token.entity.name
                    )}
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {edit ? (
                      <input
                        style={{ cursor: "pointer" }}
                        placeholder={token.email}
                        type="text"
                        onChange={(e) => setemail(e.target.value)}
                      ></input>
                    ) : (
                      token.email
                    )}
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Phone Number</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {edit ? (
                      <input
                        placeholder={token.entity.telephone}
                        type="text"
                        onChange={(e) => {
                          setphone(e.target.value);
                          if (phone !== null) {
                            if (
                              phone.length !== 11 &&
                              phone.length !== 0 &&
                              edit
                            )
                              setphone_error("invalid phone number");
                          }
                        }}
                      ></input>
                    ) : (
                      token.entity.telephone
                    )}
                    {phone !== null ? (
                      phone.length !== 11 && phone.length !== 0 && edit ? (
                        <h6 style={{ color: "red" }}>{phone_error}</h6>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Address</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {edit ? (
                      <input
                        placeholder={token.entity.address}
                        type="text"
                        onChange={(e) => setaddress(e.target.value)}
                      ></input>
                    ) : (
                      token.entity.address
                    )}
                  </div>
                </div>

                {edit ? (
                  <ButtonGroup>
                    <Button
                      variant="outline-success"
                      className="col-md-12 text-right"
                      onClick={setdata}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="col-md-12 text-right"
                      onClick={(e) => setEdit(false)}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                ) : (
                  ""
                )}
                {/* {edit ? <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>setEdit(false)}>Cancel</Button>:""} */}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {chosencomp == "orders_pharma" ? (
          <div className="card">
            <div className="card-header bg-transparent border-0">
              {order2_details.length === 0 ? (
                "No Notifications"
              ) : (
                <Accordion defaultActiveKey="0" flush>
                  {order2_details.map((item) => (
                    <Accordion.Item eventKey={item}>
                      <Accordion.Header>
                        <Col>{item.username} </Col>
                        <Col>{item.Date} </Col>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="order-body">
                          {item.flag === "image" ? (
                            <div size="small">
                              <div className="medicine-image">
                                <ModalImage
                                  small={item.form}
                                  large={item.form}
                                  alt={"Order Image"}
                                  hideDownload={true}
                                  hideZoom={true}
                                  className="modal-image"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <TableContainer
                                component={Paper}
                                style={{
                                  marginBottom: 20,
                                  marginTop: 20,
                                  width: "60%",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                }}
                              >
                                <Table
                                  sx={{ minWidth: 250 }}
                                  size="small"
                                  aria-label="a dense table"
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        style={{
                                          paddingBottom: 5,
                                          paddingTop: 5,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Medicine Name
                                      </TableCell>
                                      <TableCell
                                        style={{
                                          paddingBottom: 5,
                                          paddingTop: 0,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Quantity
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {item.form.map((f) => (
                                      <TableRow
                                        key="Medicinies"
                                        sx={{
                                          "&:last-child td, &:last-child th": {
                                            border: 0,
                                          },
                                        }}
                                      >
                                        <TableCell component="th" scope="row">
                                          {f.medicine}
                                        </TableCell>
                                        <TableCell>{f.quanity}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </div>
                          )}

                          <p>Address : {item.address}</p>
                          <p>Phone : {item.phone}</p>
                          <p>Email : {item.email}</p>
                          <br />
                          <Row className="order-comments">
                            <Col>
                              <input
                                type="text"
                                placeholder="Price"
                                onChange={(e) => {
                                  setPrice(parseFloat(e.target.value));
                                }}
                              />
                            </Col>
                            <Col>
                              <textarea
                                type="text"
                                placeholder="Comment"
                                onChange={(e) => {
                                  setComment(e.target.value);
                                }}
                              />
                            </Col>
                            <Col>
                              <ButtonGroup>
                                <Button
                                  variant="outline-success"
                                  className="col-md-12 text-right"
                                  onClick={(e) =>
                                    Approve_api(item.id, price, comment)
                                  }
                                >
                                  <MdOutlineDone />
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  className="col-md-12 text-right"
                                  onClick={(e) =>
                                    disapprove_order(item.id, comment)
                                  }
                                >
                                  <MdCancel />
                                </Button>
                              </ButtonGroup>
                            </Col>
                          </Row>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        {chosencomp == "pending_orders" ? (
          <div className="card">
            <div className="card-header bg-transparent border-0">
              {pending_orders.length === 0 ? (
                "No Pending Orders"
              ) : (
                <Accordion defaultActiveKey="0" flush>
                  {pending_orders.map((item) => (
                    <Accordion.Item eventKey={item}>
                      <Accordion.Header>
                        <Col>{item.username} </Col>
                        <Col>{item.Date} </Col>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="order-body">
                          {item.flag === "image" ? (
                            <div size="small">
                              <div className="medicine-image">
                                <ModalImage
                                  small={item.form}
                                  large={item.form}
                                  alt={"Order Image"}
                                  hideDownload={true}
                                  hideZoom={true}
                                  className="modal-image"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <TableContainer
                                component={Paper}
                                style={{
                                  marginBottom: 20,
                                  marginTop: 20,
                                  width: "60%",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                }}
                              >
                                <Table
                                  sx={{ minWidth: 250 }}
                                  size="small"
                                  aria-label="a dense table"
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        style={{
                                          paddingBottom: 5,
                                          paddingTop: 5,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Medicine Name
                                      </TableCell>
                                      <TableCell
                                        style={{
                                          paddingBottom: 5,
                                          paddingTop: 0,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Quantity
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {item.form.map((f) => (
                                      <TableRow
                                        key="Medicinies"
                                        sx={{
                                          "&:last-child td, &:last-child th": {
                                            border: 0,
                                          },
                                        }}
                                      >
                                        <TableCell component="th" scope="row">
                                          {f.medicine}
                                        </TableCell>
                                        <TableCell>{f.quanity}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </div>
                          )}
                          <p>Address : {item.address}</p>
                          <p>Phone : {item.phone}</p>
                          <p>Email : {item.email}</p>
                          <p>Price : {item.price} LE</p>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        {chosencomp == "approved_orders" ? (
          <div className="card shadow-sm">
            <div className="card-header bg-transparent border-0">
              {approved.length === 0 ? (
                "No Orders"
              ) : (
                <Accordion defaultActiveKey="0" flush>
                  {approved.map((item) => (
                    <Accordion.Item eventKey={item}>
                      <Accordion.Header>
                        <Col>{item.username} </Col>
                        <Col>{item.Date} </Col>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="order-body">
                          {item.flag === "image" ? (
                            <div size="small">
                              <div className="medicine-image">
                                <ModalImage
                                  small={item.form}
                                  large={item.form}
                                  alt={"Order Image"}
                                  hideDownload={true}
                                  hideZoom={true}
                                  className="modal-image"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <TableContainer
                                component={Paper}
                                style={{
                                  marginBottom: 20,
                                  marginTop: 20,
                                  width: "60%",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                }}
                              >
                                <Table
                                  sx={{ minWidth: 250 }}
                                  size="small"
                                  aria-label="a dense table"
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        style={{
                                          paddingBottom: 5,
                                          paddingTop: 5,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Medicine Name
                                      </TableCell>
                                      <TableCell
                                        style={{
                                          paddingBottom: 5,
                                          paddingTop: 0,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Quantity
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {item.form.map((f) => (
                                      <TableRow
                                        key="Medicinies"
                                        sx={{
                                          "&:last-child td, &:last-child th": {
                                            border: 0,
                                          },
                                        }}
                                      >
                                        <TableCell component="th" scope="row">
                                          {f.medicine}
                                        </TableCell>
                                        <TableCell>{f.quanity}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </div>
                          )}
                          <p>Address : {item.address}</p>
                          <p>Phone : {item.phone}</p>
                          <p>Email : {item.email}</p>
                          <p>Price : {item.price} LE</p>
                          <br />
                          <Button
                            variant="outline-success"
                            className="col-md-12 text-right"
                            onClick={(e) => Done_Api(item.id)}
                          >
                            Done <MdOutlineDoneOutline />
                          </Button>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        {chosencomp == "pharma_history" ? (
          <div className="card shadow-sm">
            <div className="card-header bg-transparent border-0">
              {history.length === 0 ? (
                "No History"
              ) : (
                <Accordion defaultActiveKey="0" flush>
                  {history.map((item) => (
                    <Accordion.Item eventKey={item}>
                      <Accordion.Header>
                        <Col>{item.username} </Col>
                        <Col>{item.Date} </Col>
                        <Col>{item.status}</Col>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="order-body">
                          {item.flag === "image" ? (
                            <div size="small">
                              <div className="medicine-image">
                                <ModalImage
                                  small={item.form}
                                  large={item.form}
                                  alt={"Order Image"}
                                  hideDownload={true}
                                  hideZoom={true}
                                  className="modal-image"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <TableContainer
                                component={Paper}
                                style={{
                                  marginBottom: 20,
                                  marginTop: 20,
                                  width: "60%",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                }}
                              >
                                <Table
                                  sx={{ minWidth: 250 }}
                                  size="small"
                                  aria-label="a dense table"
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        style={{
                                          paddingBottom: 5,
                                          paddingTop: 5,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Medicine Name
                                      </TableCell>
                                      <TableCell
                                        style={{
                                          paddingBottom: 5,
                                          paddingTop: 0,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Quantity
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {item.form.map((f) => (
                                      <TableRow
                                        key="Medicinies"
                                        sx={{
                                          "&:last-child td, &:last-child th": {
                                            border: 0,
                                          },
                                        }}
                                      >
                                        <TableCell component="th" scope="row">
                                          {f.medicine}
                                        </TableCell>
                                        <TableCell>{f.quanity}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </div>
                          )}

                          <p>Address : {item.address}</p>
                          <p>Phone : {item.phone}</p>
                          <p>Email : {item.email}</p>
                          {item.status === "disapproved" ? (
                            ""
                          ) : item.status === "cancelled" ? (
                            ""
                          ) : (
                            <p>Price : {item.price} LE</p>
                          )}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                  <br />
                </Accordion>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};
export default Ph_admin;

import React, { useEffect } from "react";
import { useState } from "react";
import { DeleteOutline } from "@material-ui/icons";
import { Button } from "react-bootstrap";
import Table from "../../Table/Table";
import axios from "axios";
import AddClinic from "./AddClinic";
import EditClinic from "./EditClinic";
import { useSelector, useDispatch } from "react-redux";
import AlertDelete from "../AlertDelete/AlertDelete";
import AlertActivate from "../AlertDelete/AlertActivate";
import { logout } from "../../../actions";
import { Link, useNavigate } from "react-router-dom";

export default function Clinics() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(useSelector((state) => state.auth)); //state of token
  const [data, setdata] = useState([]); //FROM API CLINICS LIST
  var clinics_list = JSON.parse(JSON.stringify(data));
  const [alert_delete, set_alert_delete] = useState(false);
  const [alert_active, set_alert_active] = useState(false);

  const [clicked_clinic, set_clicked_clinic] = useState({});
  let clinic = {};

  const Dectivate_Clinic_Api = async (clinic_name) => {
    try {
      const res = await axios.patch(
        "https://future-medical.herokuapp.com/admin/entity/deactivate",
        {
          name: clinic_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      const data = await res.data;
      Get_Clinics_Api(); //IT WILL GET THE ACTIVE Clinics
      console.log(data);
    } catch (err) {
      if (err.response) {
        if (err.response.data === "not authorized, token is failed") {
          dispatch(logout());
          navigate("/");
        }
      }
    }
  };
  const Activate_Clinic_Api = async (clinic_name) => {
    try {
      const res = await axios.patch(
        "https://future-medical.herokuapp.com/admin/entity/activate",
        {
          entity: clinic_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      const data = await res.data;
      Get_Clinics_Api(); //IT WILL GET THE All clinics
      console.log(data);
    } catch (err) {
      //console.error(err);
      if (err.response) {
        if (err.response.data === "not authorized, token is failed") {
          dispatch(logout());
          navigate("/");
        }
      }
    }
  };
  const Get_Clinics_Api = async () => {
    try {
      const res = await axios.get(
        "https://future-medical.herokuapp.com/clinics"
      );
      const data = await res.data;
      let i = 1;
      clinics_list = [];
      data.forEach((x) => {
        console.log(x.name);
        clinic.clinicname = x.name;
        clinic.id = i;
        clinic.number = x.telephone[0];
        clinic.Admin = x.admin.username;
        clinic.Email = x.admin.email;
        clinic.Location = x.address;
        clinic.active = true;
        clinics_list.push(clinic);
        clinic = {};
        ++i;
      });
      setdata(clinics_list);
      Get_Clinics_Deactivated_Api(clinics_list);
    } catch (err) {
      console.log(err);
    }
  };

  const Get_Clinics_Deactivated_Api = async (activateList) => {
    console.log(activateList);
    try {
      const res = await axios.get(
        `https://future-medical.herokuapp.com/admin/clinics/deactivated`,
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      const data = await res.data;
      console.log(data);
      if (data === "there is no deactivated clinics") {
        return;
      }
      let i = 0;
      if (activateList.length == 0) {
        i = 1;
      } else {
        i = activateList[activateList.length - 1].id + 1;
      }

      clinics_list = [];
      data.forEach((x) => {
        clinic.clinicname = x.name;
        clinic.id = i;
        clinic.number = x.telephone[0];
        clinic.Admin = x.admin.username;
        clinic.Email = x.admin.email;
        clinic.Location = x.address;
        clinic.active = false;
        clinics_list.push(clinic);
        clinic = {};

        //doctor.number = x.telephone[0];
        //doctor.price = x.meeting_price;

        ++i;
      });

      setdata(activateList.concat(clinics_list));
    } catch (err) {
      if (err.response) {
        if (err.response.data === "not authorized, token is failed") {
          dispatch(logout());
          navigate("/");
        }
      }
    }
  };

  useEffect(() => {
    //Get_Clinics_Api().then((res)=>{ setdata(res)}).catch((err)=>{console.log(err)})
    Get_Clinics_Api();
  }, []);

  const [viewedit, setedit] = useState(true); //WHEN FALSE SHOW COMPONENT EDIT CLINIC
  const [viewadd, setadd] = useState(true); //WHEN FALSE SHOW COMPONENT ADD CLINIC

  const [editdata, seteditdata] = useState({});
  const handleEdit = (props) => {
    seteditdata(props); //DATA OF CLINIC
    console.log(props);
    setedit(false); //GO TO EDIT PAGE
  };

  const goback = () => {
    setedit(true);
    setadd(true);
  };

  const changeedit = (editedclinic) => {
    //WHEN SUBMIT EDIT CLINIC FORM
    var requiredid = editedclinic.id;
    console.log(requiredid);
    var updatedlist = JSON.parse(JSON.stringify(data));
    updatedlist = updatedlist.filter((item) => item.id !== requiredid); //delete first
    //console.log(updatedlist);
    updatedlist.push(editedclinic); //add edited one
    // console.log(updatedlist);
    //Static update list
    setdata(updatedlist);
    setedit(true); //AFTER SUBMIT EDIT FORM [GET BACK TO CLINICS LIST]
  };
  const changeadd = (newhospital) => {
    //WHEN SUBMIT ADD HOSPITAL FORM
    var lastid = 0;
    var updatedlist = JSON.parse(JSON.stringify(data));
    if (updatedlist.length == 0) {
      lastid = 0;
    } //To make the first has id = 1
    else {
      lastid = updatedlist[updatedlist.length - 1].id;
    }
    console.log(lastid);
    newhospital.id = (parseInt(lastid) + 1).toString();
    updatedlist.push(newhospital);
    //Static update list
    setdata(updatedlist);
    setadd(true); //AFTER SUBMIT ADD FORM [GET BACK TO HOSPITALS LIST]
  };

  const handleDelete = (clicked_clinic_row) => {
    //API DELETE Hospital
    //Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
    set_clicked_clinic(clicked_clinic_row);
    set_alert_delete(true);
    //setdata(data.filter((item) => item.id !== id)) //DELETE STATIC
  };

  const Close_Alert_yes = (clicked_clinic_row) => {
    Dectivate_Clinic_Api(clicked_clinic_row.clinicname);
    set_alert_delete(false);
  };
  const Close_Alert_No = () => {
    //Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
    set_alert_delete(false);
  };

  const handleActive = (clicked_Item) => {
    set_clicked_clinic(clicked_Item);
    console.log(clicked_Item);
    set_alert_active(true);
  };

  const Close_Alert_yes_activate = (clicked_Item) => {
    Activate_Clinic_Api(clicked_Item.clinicname);
    set_alert_active(false);
    //Activate_Hospital_Api(clicked_Item.Email)
  };
  const Close_Alert_No_activate = () => {
    //Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
    set_alert_active(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "Number",
      width: 140,
    },
    {
      field: "clinicname",
      headerName: "Clinic Name",
      width: 220,
    },
    {
      field: "number",
      headerName: "Contact Number",
      width: 190,
    },
    {
      field: "Admin",
      headerName: "Admin Name",
      width: 190,
    },
    {
      field: "Email",
      headerName: "Admin Email",
      width: 190,
    },
    {
      field: "Location",
      headerName: "Location",

      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.active == false && (
              <Button
                variant="outline-success"
                onClick={() => handleActive(params.row)}
              >
                Activate{" "}
              </Button>
            )}
            {params.row.active == true && (
              <DeleteOutline
                htmlColor="red"
                style={{ cursor: "pointer", marginLeft: "30px" }}
                onClick={() => handleDelete(params.row)}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <div>
      <div
        style={{
          height: 540,
          width: "90%",
          margin: "1rem 2rem",
          marginBottom: "60px",
        }}
      >
        {viewedit && viewadd && <Table rows={data} columns={columns}></Table>}
        {viewedit && viewadd && (
          <Button
            variant="primary"
            onClick={() => {
              setadd(false);
            }}
            style={{ margin: "15px" }}
          >
            Add Clinic
          </Button>
        )}
        {/*!viewedit && <EditClinic editdata={editdata} changeedit={changeedit}  goback={goback}/>*/}
        {!viewadd && (
          <AddClinic
            changeadd={changeadd}
            goback={goback}
            getclinics={Get_Clinics_Api}
          />
        )}
        {alert_delete && (
          <AlertDelete
            open={alert_delete}
            Close_Alert_No={Close_Alert_No}
            Close_Alert_yes={Close_Alert_yes}
            clicked_hos={clicked_clinic}
            parent={"clinic"}
          ></AlertDelete>
        )}
        {alert_active && (
          <AlertActivate
            open={alert_active}
            Close_Alert_No_activate={Close_Alert_No_activate}
            Close_Alert_yes_activate={Close_Alert_yes_activate}
            clicked_item={clicked_clinic}
            parent={"clinic"}
          ></AlertActivate>
        )}
      </div>
    </div>
  );
}

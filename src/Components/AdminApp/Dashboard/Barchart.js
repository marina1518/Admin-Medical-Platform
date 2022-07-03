import React, { useEffect, useState } from "react";
import "./chart.css";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Card, Stack } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

/*const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];*/

{
  /*return (
        <Card className="chart">
        <div>
        <h3 className="chartTitle">AGE USERS</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
       </div>
      </Card>
    );
  
}*/
}

function Barchart() {
  let one_age = {};
  let age_list = [];
  const [data, setdata] = useState([]);
  const token = JSON.parse(useSelector((state) => state.auth)); //state of token

  const Ages_barchart_Api = async () => {
    try {
      const res = await axios.get(
        "https://future-medical.herokuapp.com/admin/dashboard/ages",
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      const data = await res.data;
      console.log(data);
      for (let x in data) {
        one_age.name = x;
        one_age.males = data[x][0];
        one_age.females = data[x][1];
        age_list.push(one_age);
        one_age = {};
        /*console.log("dic[x]=",x);
                console.log("male count =",data[x][0]);
                console.log("female count =",data[x][1]);*/
      }
      setdata(age_list);
      console.log("age_list", age_list);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    Ages_barchart_Api();
  }, []);
  return (
    <Card className="chart">
      <div>
        <h3 className="chartTitle">Users Analytics with ages</h3>
        <BarChart
          className="bar-chart-edit"
          style={{ margin: "0 auto" }}
          width={600}
          height={300}
          data={data}

          /*margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}*/
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="males" stackId="a" fill="#8884d8" />
          <Bar dataKey="females" stackId="a" fill="#82ca9d" />
        </BarChart>
      </div>
    </Card>
  );
}
export default Barchart;

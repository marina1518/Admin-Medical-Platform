import React from 'react'
import './chart.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, Stack } from 'react-bootstrap';
export default function Chart({ title, data, dataKey}) {

function formatYAxis(value) {
  switch(value) {
    case 2:
      return "up";
    case -2:
      return "down";
    case 1:
      return "connection_recovered";
    default:
      return ""
  }
}

    return (    
      
      <Card className="chart">
        <div>
        <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer  aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#8884d0" />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d0" />
           <Line dataKey="Active Hospital name" stroke="#8884d0" />
          <Tooltip />
           <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
      </div>
      </Card>
    
    )
}

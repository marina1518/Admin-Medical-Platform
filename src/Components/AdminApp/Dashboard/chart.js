import React from 'react'
import './chart.css'
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, Stack } from 'react-bootstrap';
export default function Chart({ title, data, dataKey}) {
    return (    
      
      <Card className="chart">
        <div>
        <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer  aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#8884d0" />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d0" />
          <Tooltip />
           <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
      </div>
      </Card>
    
    )
}

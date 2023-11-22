import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: '네이버', value: 100 },
  { name: '카카오', value: 150 },
  { name: '구글', value: 30 },
  { name: '트렌드3', value: 50 },
];

const MyBarChart = () => {
  return (
    <BarChart width={600} height={600} data={data}>
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#664369" />
    </BarChart>
  );
}

export default MyBarChart;

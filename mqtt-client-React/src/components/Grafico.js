import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TemperaturesChart = () => {
  const [chartData, setChartData] = useState([]);

  const fetchTemperatures = async () => {
    try {
      const response = await axios.get('http://localhost:5000/temperaturas');
      const data = response.data;
      const formattedData = data.map(item => ({
        fecha: item.fecha_hora, // Asegúrate de formatear la fecha como prefieras
        temperatura: item.temp,
      }));
      setChartData(formattedData);
    } catch (error) {
      console.log("test")
      console.error('Error al obtener los datos de temperatura', error);
    }
  };

  useEffect(() => {
    fetchTemperatures();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
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
        <Line type="monotone" dataKey="temperatura" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperaturesChart;

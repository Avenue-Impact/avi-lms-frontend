// src/components/ChartWrapper.jsx
import React from "react";
import { Line, Radar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
);

const ChartWrapper = ({ type, data, options }) => {
  switch (type) {
    case "line":
      return <Line data={data} options={options} />;
    case "radar":
      return <Radar data={data} options={options} />;
    case "pie":
      return <Pie data={data} options={options} />;
    default:
      return <p>Invalid chart type</p>;
  }
};

export default ChartWrapper;

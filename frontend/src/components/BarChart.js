import React, { useContext, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import ServicesContext from "../context/ServicesContext";

function BarChart() {
  const [data, setData] = useState({});
  const { services } = useContext(ServicesContext);
  const { servicesData } = services;

  useEffect(() => {
    if (servicesData.length) {
      const map = {};
      const backgroundColors = [];

      servicesData.forEach((service) => {
        if (!map[service.type]) {
          map[service.type] = service.charge;
          backgroundColors.push(getRandomColor());
        } else {
          map[service.type] += service.charge;
        }
      });

      setData({
        labels: Object.keys(map),
        datasets: [
          {
            label: "Service Usage",
            data: Object.values(map),
            backgroundColor: backgroundColors,
          },
        ],
      });
    }
  }, [services, servicesData]);

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div>
      <div className="fw-bolder chart-description">Services Usage Overview</div>
      {Object.values(data).length ? (
        <Bar data={data} options={options} />
      ) : (
        <div>
          <img src="loader.svg" alt="loader" />
        </div>
      )}
    </div>
  );
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default BarChart;

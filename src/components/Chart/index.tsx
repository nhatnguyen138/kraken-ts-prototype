import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import moment from 'moment'
import { StreamingPlugin, RealTimeScale } from "chartjs-plugin-streaming";
Chart.register(StreamingPlugin, RealTimeScale);


// const TheChart = require("react-chartjs-2").Chart;

export const LiveUpdateChart = () => {


  

const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)"
};

// const color = TheChart.helpers.color;
const data = {
  datasets: [
    {
      label: "Dataset 1 (linear interpolation)",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      fill: false,
      lineTension: 0,
      borderDash: [8, 4],
      data: []
    }
  ]
} as any
  // const data = {
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       fill: false,
  //       lineTension: 0.4,
  //       backgroundColor: "#f44336",
  //       borderColor: "#f44336",
  //       borderJoinStyle: "miter",
  //       pointRadius: 0,
  //       showLine: true,
  //       data: [],
  //     },
  //   ],
  // } as any;

  const options = {
    scales: {
      xAxes: [
        {
          type: "realtime",
          distribution: "linear",
          realtime: {
            onRefresh: function(chart:any) {
              chart.data.datasets[0].data.push({
                x: moment(),
                y: Math.random()
              });
            },
            delay: 3000,
            time: {
              displayFormat: "h:mm"
            }
          },
          ticks: {
            displayFormats: 1,
            maxRotation: 0,
            minRotation: 0,
            stepSize: 1,
            maxTicksLimit: 30,
            minUnit: "second",
            source: "auto",
            autoSkip: true,
            callback: function(value:any) {
              return moment(value, "HH:mm:ss").format("mm:ss");
            }
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 1
          }
        }
      ]
    }
  } as any;

  return (
    <div style={{textAlign: "center", padding: '60px'}}>
      <div style={{border:'1px solid yellow'}}>
        <Line data={data} options={options} width={200} height={100} />
      </div>
    </div>
  );
};

export default LiveUpdateChart
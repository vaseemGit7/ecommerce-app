import { Doughnut } from "react-chartjs-2";
import { Chart, Tooltip, Legend, ArcElement } from "chart.js";
import doughnutChartData from "../database/pesudoData";

Chart.register(Tooltip, Legend, ArcElement);

const DoughnutChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  return <Doughnut options={options} data={doughnutChartData} />;
};

export default DoughnutChart;

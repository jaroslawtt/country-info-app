import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  data: { year: number; value: number }[];
};

const PopulationChart: React.FC<Props> = ({ data: chartData }: Props) => {
  const data = {
    labels: chartData.map((d) => d.year),
    datasets: [
      {
        label: "Population",
        data: chartData.map((d) => d.value),
        borderColor: "#000000",
        backgroundColor: "#000000",
        tension: 0,
        borderWidth: 1,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Population Growth",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export { PopulationChart };

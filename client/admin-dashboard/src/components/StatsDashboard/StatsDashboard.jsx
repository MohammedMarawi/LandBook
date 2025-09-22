import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function StatsDashboard() {
  const landsByCity = {
    labels: ["Homs", "Damascus", "Hama", "Aleppo"],
    datasets: [
      {
        label: "الأراضي المحجوزة",
        data: [12, 19, 7, 5],
        backgroundColor: ["#4CAF50", "#81C784", "#A5D6A7", "#C8E6C9"],
      },
    ],
  };

  const topOwners = {
    labels: ["مالك1","مالك2","مالك3","مالك4"],
    datasets: [
      {
        label: "عدد الحجوزات",
        data: [10,6,4,3],
        backgroundColor: ["#4CAF50", "#81C784", "#A5D6A7", "#C8E6C9"],
      },
    ],
  };

  const landsCount = {
    labels: ["Homs", "Damascus", "Hama", "Aleppo"],
    datasets: [
      {
        label: "عدد الأراضي",
        data: [20,15,10,7],
        backgroundColor: ["#81C784", "#A5D6A7", "#4CAF50", "#C8E6C9"],
      },
    ],
  };

  const prices = {
    labels: ["500$", "1000$", "2000$", "5000$"],
    datasets: [
      {
        label: "عدد الأراضي",
        data: [5,7,3,2],
        backgroundColor: ["#A5D6A7", "#81C784", "#4CAF50", "#388E3C"],
      },
    ],
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
      <div>
        <h3>نسبة الأراضي المحجوزة في كل مدينة</h3>
        <Pie data={landsByCity} />
      </div>
      <div>
        <h3>أكثر المالكين حجزاً</h3>
        <Bar data={topOwners} />
      </div>
      <div>
        <h3>عدد الأراضي في كل مدينة</h3>
        <Bar data={landsCount} />
      </div>
      <div>
        <h3>إحصائيات الأسعار</h3>
        <Pie data={prices} />
      </div>
    </div>
  );
}

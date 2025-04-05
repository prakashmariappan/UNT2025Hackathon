import React, { useEffect, useState } from "react";
import axios from "axios";
//import { Bar } from "react-chartjs-2";

export function BiasDashboard() {
  const [biasData, setBiasData] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/bias-report").then(res => setBiasData(res.data));
  }, []);

  if (!biasData) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Bias Detection</h2>
    <div className="bg-white shadow p-4 rounded-lg">
      <h3 className="text-lg">Disparate Impact Ratio: {biasData.impact_ratio}</h3>
      <p className="mb-2">Approval Rate (Male): {biasData.approval_male}%</p>
      <p className="mb-2">Approval Rate (Female): {biasData.approval_female}%</p>
      {/* <Bar data={biasData.chart_data} /> */}
    </div>
    </div>
  );
}
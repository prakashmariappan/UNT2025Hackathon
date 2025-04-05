import React, { useState, useEffect } from "react";
import axios from "axios";

export function FraudDashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("/api/fraud-samples").then(res => setTransactions(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Fraud Detection</h2>
      <table className="w-full table-auto bg-white shadow rounded-lg">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2">Txn ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Risk Score</th>
            <th className="p-2">Location</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn: any) => (
            <tr key={txn.id} className="border-t">
              <td className="p-2">{txn.id}</td>
              <td className="p-2">{txn.customer}</td>
              <td className="p-2">${txn.amount}</td>
              <td className="p-2 text-red-600 font-bold">{txn.risk_score}%</td>
              <td className="p-2">{txn.location}</td>
              <td className="p-2"><button className="bg-red-500 text-white px-3 py-1 rounded">Flag</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
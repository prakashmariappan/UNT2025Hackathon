// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { FraudDashboard } from "./components/FraudDashboard";
import { BiasDashboard } from "./components/BiasDashboard";
import { EmailDashboard } from "./components/EmailDashboard";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Bank AI Dashboard</h1>
          <nav className="flex space-x-4">
            <NavLink to="/fraud" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-600"}>Fraud</NavLink>
            <NavLink to="/bias" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-600"}>Bias</NavLink>
            <NavLink to="/email" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-600"}>Email</NavLink>
          </nav>
        </header>
        <main className="p-6">
          <Routes>
            <Route path="/fraud" element={<FraudDashboard />} />
            <Route path="/bias" element={<BiasDashboard />} />
            <Route path="/email" element={<EmailDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
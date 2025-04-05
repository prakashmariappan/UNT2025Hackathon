import React, { useState } from "react";
//import axios from "axios";

export function EmailDashboard() {
  const [emailText, setEmailText] = useState("");
  const [scanResult, setScanResult] = useState<any>(null);

  //const scanEmail = () => {
    //axios.post("/api/scan-email", { text: emailText }).then(res => setScanResult(res.data));
  //};

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Email Spam/Phishing Detector</h2>
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows={6}
        placeholder="Paste suspicious email here..."
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
      />
      {/*<button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={scanEmail}>Scan Email</button>*/}

      {scanResult && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <p><strong>Risk Score:</strong> {scanResult.risk_score}%</p>
          <p><strong>Type:</strong> {scanResult.category}</p>
          <p><strong>Flagged Phrases:</strong> {scanResult.keywords.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
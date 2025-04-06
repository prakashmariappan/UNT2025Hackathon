import React, { useEffect, useState } from "react";

const FraudDetection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch("https://htunt2025-yldpcq4wbq-uc.a.run.app/data")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return response.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleFeedback = (index, isFraud) => {
    const selectedTransaction = data[index];
    const id = selectedTransaction.id;

    const endpoint = isFraud
      ? `https://htunt2025-yldpcq4wbq-uc.a.run.app/mark_fraud/${id}`
      : `https://htunt2025-yldpcq4wbq-uc.a.run.app/mark_safe/${id}`;

    setIsUpdating(true);

    fetch(endpoint, { method: "GET" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send feedback");
        return res.json();
      })
      .then(() => {
        setIsUpdating(false);
        fetchData();
        setExpandedRow(null);
      })
      .catch((err) => {
        console.error(err);
        setIsUpdating(false);
      });
  };

  // Custom status styling
  const getStatusStyle = (status) => {
    const normalized = status.toLowerCase();
    if (normalized === "fraud") return { color: "red", fontWeight: "bold" };
    if (normalized.includes("review")) return { color: "blue", fontWeight: "bold" };
    if (normalized === "not fraud") return { color: "green", fontWeight: "bold" };
    return { fontWeight: "bold" };
  };

  if (loading) return <div className="loader"></div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="fraud-container">
      <h2 className="section-header">Fraud Detection Data</h2>
      <table className="fraud-table">
        <thead>
          <tr>
            <th className="top-left">Company</th>
            <th>Account #</th>
            <th>Old Balance</th>
            <th>New Balance</th>
            <th>Amount Debited</th>
            <th>Status</th>
            <th>Transaction Time</th>
            <th className="top-right">Fraud?</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={item.id}>
              <tr
                className={`clickable-row ${expandedRow === index ? "active-row" : ""}`}
                onClick={() => handleRowClick(index)}
              >
                <td>{item.company_name}</td>
                <td>{item.source_account_number}</td>
                <td>{item.amount_before_transaction}</td>
                <td>{item.amount_after_transaction}</td>
                <td>{item.amount_debited !== null ? item.amount_debited : "N/A"}</td>
                <td style={getStatusStyle(item.status)}>{item.status}</td>
                <td>{new Date(item.transaction_time).toLocaleString()}</td>
                <td>{item.is_fraud === 1 ? "Yes" : "No"}</td>
              </tr>
              {expandedRow === index && (
                <tr className="feedback-row">
                  <td colSpan="8">
                    <div className="feedback-box">
                      <span>Was this flagged correctly?</span>
                      <button
                        className="btn-yes"
                        onClick={() => handleFeedback(index, true)}
                        disabled={isUpdating}
                      >
                        Yes
                      </button>
                      <button
                        className="btn-no"
                        onClick={() => handleFeedback(index, false)}
                        disabled={isUpdating}
                      >
                        No
                      </button>
                    </div>
                    {isUpdating && <div className="updating-loader"></div>}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FraudDetection;

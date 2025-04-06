import React, { useEffect, useState } from "react";

const FraudDetection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // For feedback update loading

  // Fetch data function
  const fetchData = () => {
    setLoading(true); // Start loading when fetching
    fetch("https://htunt2025-yldpcq4wbq-uc.a.run.app/data", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return response.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false); // Stop loading when done
      })
      .catch((error) => {
        setError(error);
        setLoading(false); // Stop loading if error occurs
      });
  };

  // On mount + refresh every 5 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  // Toggle expanded row
  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  // Handle user feedback
  const handleFeedback = (index, isFraud) => {
    const selectedTransaction = data[index];
    const id = selectedTransaction.id;

    const endpoint = isFraud
      ? `https://htunt2025-yldpcq4wbq-uc.a.run.app/mark_fraud/${id}`
      : `https://htunt2025-yldpcq4wbq-uc.a.run.app/mark_safe/${id}`;

    setIsUpdating(true); // Show loader when updating feedback

    fetch(endpoint, {
      method: "GET", // ✅ Changed to GET
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send feedback");
        return res.json();
      })
      .then(() => {
        setIsUpdating(false); // Hide loader after feedback is updated
        fetchData(); // Reload table after feedback
        setExpandedRow(null); // Close the feedback row after submission
      })
      .catch((err) => {
        console.error(err);
        setIsUpdating(false); // Hide loader if there's an error
        // Optional: show some error UI or message here if necessary
      });
  };

  if (loading) return <div className="loader"></div>; // Show circle loader when table is loading
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
                <td>{item.status}</td>
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
                        disabled={isUpdating} // Disable button while updating
                      >
                        Yes
                      </button>
                      <button
                        className="btn-no"
                        onClick={() => handleFeedback(index, false)}
                        disabled={isUpdating} // Disable button while updating
                      >
                        No
                      </button>
                    </div>
                    {isUpdating && <div className="updating-loader"></div>} {/* Circle loader during update */}
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

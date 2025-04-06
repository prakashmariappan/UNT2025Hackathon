import React, { useEffect, useState } from "react";

const FraudDetection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null); // For toggling extra input

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://htunt2025-yldpcq4wbq-uc.a.run.app/data", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleFeedback = (index, response) => {
    alert(`Row ${index + 1} marked as: ${response}`);
    // Here you can POST to your feedback API or handle state update
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="fraud-container">
      <h2 className="section-header">Fraud Detection Data</h2>
      <table className="fraud-table">
        <thead>
          <tr>
            <th className="top-left">Name</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Old Balance (Orig)</th>
            <th>Old Balance (Dest)</th>
            <th>New Balance (Orig)</th>
            <th>New Balance (Dest)</th>
            <th className="top-right">Is Fraud?</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr
                key={index}
                className={`clickable-row ${
                  expandedRow === index ? "active-row" : ""
                }`}
                onClick={() => handleRowClick(index)}
              >
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.type}</td>
                <td>{item.oldbalanceOrg}</td>
                <td>{item.oldbalanceDest}</td>
                <td>{item.newbalanceOrig}</td>
                <td>{item.newbalanceDest}</td>
                <td>{item.isFraud === 1 ? "Yes" : "No"}</td>
              </tr>
              {expandedRow === index && (
                <tr className="feedback-row">
                  <td colSpan="8">
                    <div className="feedback-box">
                      <span>Was this flagged correctly?</span>
                      <button
                        className="btn-yes"
                        onClick={() => handleFeedback(index, "Yes")}
                      >
                        Yes
                      </button>
                      <button
                        className="btn-no"
                        onClick={() => handleFeedback(index, "No")}
                      >
                        No
                      </button>
                    </div>
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

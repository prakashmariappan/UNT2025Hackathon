// FraudDetection.js
import React, { useEffect, useState } from 'react';


const FraudDetection = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    // Fetch the data from API
    fetch("https://htunt2025-yldpcq4wbq-uc.a.run.app/data", requestOptions)
      .then((response) => response.json()) // Parse response as JSON
      .then((result) => {
        setData(result); // Store the result in state
        setLoading(false); // Set loading to false after fetching
      })
      .catch((error) => {
        setError(error); // Set error state if something goes wrong
        setLoading(false); // Set loading to false if there's an error
      });
  }, []); // Empty dependency array to fetch data only once on mount

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="fraud-container">
      <h2 className='section-header'>Fraud Detection Data</h2>
      <table className="fraud-table">
        <thead>
          <tr>
            <th className='top-left'>Name</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Old Balance (Orig)</th>
            <th>Old Balance (Dest)</th>
            <th>New Balance (Orig)</th>
            <th>New Balance (Dest)</th>
            <th className='top-right'>Is Fraud?</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>{item.type}</td>
              <td>{item.oldbalanceOrg}</td>
              <td>{item.oldbalanceDest}</td>
              <td>{item.newbalanceOrig}</td>
              <td>{item.newbalanceDest}</td>
              <td>{item.isFraud === 1 ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FraudDetection;

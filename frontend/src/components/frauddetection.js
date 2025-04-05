import React, { useState, useEffect } from 'react';


const FraudDetection = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Replace with API call to fetch fraud data
        setTransactions([
            { id: 'T12345', amount: 5000, location: 'NY', score: 85 },
            { id: 'T12346', amount: 200, location: 'LA', score: 40 },
        ]);
    }, []);

    return (
        <div className="fraud-container">
            <h1>Fraud Detection</h1>
            <table className="fraud-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Location</th>
                        <th>Risk Score</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((txn) => (
                        <tr key={txn.id}>
                            <td>{txn.id}</td>
                            <td>{txn.amount}</td>
                            <td>{txn.location}</td>
                            <td>{txn.score}</td>
                            <td><button className="action-btn">Review</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FraudDetection;

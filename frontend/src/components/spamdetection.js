import React, { useState, useEffect } from 'react';


const BiasDetection = () => {
    const [biasMetrics, setBiasMetrics] = useState([]);

    useEffect(() => {
        // Replace with API call to fetch bias detection data
        setBiasMetrics([
            { metric: 'Disparate Impact', score: 0.72, group: 'Male', rate: 85 },
            { metric: 'Disparate Impact', score: 0.56, group: 'Female', rate: 60 },
        ]);
    }, []);

    return (
        <div className="bias-container">
            <h1>AI Bias Detection</h1>
            <table className="bias-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Group</th>
                        <th>Approval Rate</th>
                        <th>Bias Score</th>
                    </tr>
                </thead>
                <tbody>
                    {biasMetrics.map((metric) => (
                        <tr key={metric.group}>
                            <td>{metric.metric}</td>
                            <td>{metric.group}</td>
                            <td>{metric.rate}%</td>
                            <td>{metric.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BiasDetection;

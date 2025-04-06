import React, { useState, useEffect } from "react";

const SpamDetection = () => {
  const [spamEmails, setSpamEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 15;

  // Pagination batching
  const [pageBatch, setPageBatch] = useState(0);
  const pagesPerBatch = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://htunt2025-yldpcq4wbq-uc.a.run.app/SpamEmails_data");
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setSpamEmails(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const splitSender = (sender) => {
    const nameMatch = sender.match(/^(.*?)\s*</);
    const emailMatch = sender.match(/<(.*?)>/);
    const fullName = nameMatch ? nameMatch[1].trim() : "";
    const email = emailMatch ? emailMatch[1] : "";
    return { fullName, email };
  };

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = spamEmails.slice(indexOfFirstEmail, indexOfLastEmail);
  const totalPages = Math.ceil(spamEmails.length / emailsPerPage);
  const totalBatches = Math.ceil(totalPages / pagesPerBatch);

  const currentBatchPages = Array.from({ length: pagesPerBatch }, (_, i) => {
    const page = pageBatch * pagesPerBatch + i + 1;
    return page <= totalPages ? page : null;
  }).filter(Boolean);

  const goToNextBatch = () => {
    if (pageBatch < totalBatches - 1) {
      setPageBatch(pageBatch + 1);
      setCurrentPage((pageBatch + 1) * pagesPerBatch + 1);
    }
  };

  const goToPrevBatch = () => {
    if (pageBatch > 0) {
      setPageBatch(pageBatch - 1);
      setCurrentPage((pageBatch - 1) * pagesPerBatch + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="fraud-container">
      <h2 className="section-header">Spam Emails</h2>

      <table className="fraud-table">
        <thead>
          <tr>
            <th className="top-left">Subject</th>
            <th>Sender Name</th>
            <th>Sender Email</th>
            <th>Created At</th>
            <th>Probability</th>
            <th className="top-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEmails.map((email, index) => {
            const { fullName, email: senderEmail } = splitSender(email.sender);
            return (
              <tr key={index}>
                <td>{email.subject}</td>
                <td>{fullName}</td>
                <td>{senderEmail}</td>
                <td>{new Date(email.created_at).toLocaleString()}</td>
                <td>{parseFloat(email.probability).toFixed(2)}</td>
                <td>
                  <a href={`mailto:${email.user_mail_id}`} target="_blank" rel="noopener noreferrer">
                    Reply
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Results per page + Pagination */}
      <div>
        <p className="results-per-page">
          Showing {emailsPerPage} results per page
        </p>

        <div className="pagination" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              cursor: pageBatch > 0 ? "pointer" : "default",
              opacity: pageBatch > 0 ? 1 : 0.3,
              fontSize: "1.2rem",
              userSelect: "none",
            }}
            onClick={goToPrevBatch}
          >
            &lt;
          </span>

          {currentBatchPages.map((page) => (
            <span
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                margin: "0 4px",
                padding: "6px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                backgroundColor: currentPage === page ? "#007bff" : "#f0f0f0",
                color: currentPage === page ? "#fff" : "#000",
                fontWeight: currentPage === page ? "bold" : "normal",
                border: "1px solid #ccc",
              }}
            >
              {page}
            </span>
          ))}

          <span
            style={{
              cursor: pageBatch < totalBatches - 1 ? "pointer" : "default",
              opacity: pageBatch < totalBatches - 1 ? 1 : 0.3,
              fontSize: "1.2rem",
              userSelect: "none",
            }}
            onClick={goToNextBatch}
          >
            &gt;
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpamDetection;

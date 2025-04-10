import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./ShortlistedCandidates.css";

const ShortlistedCandidates = () => {
  const [jobId, setJobId] = useState(5);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchShortlisted = async () => {
      try {
        const res = await axios.get("/shortlist/shortlisted", {
          params: { job_id: jobId },
          headers: {
            Accept: "text/html",
          },
        });

        const html = document.createElement("div");
        html.innerHTML = res.data;
        const listItems = html.querySelectorAll("li");

        const parsedCandidates = Array.from(listItems).map((li) => {
          const text = li.innerText;
          const match = text.match(/^(\d+)\s*-\s*(.+?)\s*-\s*(.+)$/);
          return {
            candidateId: match?.[1],
            name: match?.[2],
            email: match?.[3],
          };
        });

        setCandidates(parsedCandidates);
      } catch (err) {
        console.error("Error fetching shortlisted candidates:", err);
      }
    };

    fetchShortlisted();
  }, [jobId]);

  const handleSendEmail = async (candidateId) => {
    try {
      await axios.post(
        "/shortlist/send_email/",
        new URLSearchParams({
          candidate_id: candidateId,
          job_id: jobId,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      setCandidates((prev) =>
        prev.map((c) =>
          c.candidateId === candidateId ? { ...c, emailSent: true } : c
        )
      );
      
      alert("Email sent!");
    } catch (err) {
      console.error("Error sending email:", err);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="shortlisted-container">
      <h1>Shortlisted Candidates</h1>

      <div className="dropdown-container">
        <label htmlFor="jobId">Select Job ID: </label>
        <select
          id="jobId"
          value={jobId}
          onChange={(e) => setJobId(Number(e.target.value))}
        >
          <option value={19}>Job 19</option>
          <option value={5}>Job 5</option>
          <option value={21}>Job 21</option>
        </select>
      </div>

      <h2>Shortlisted for Job {jobId}</h2>

      <table className="shortlist-table">
        <thead>
          <tr>
            <th>Candidate ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Send Email</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c, index) => (
            <tr key={index}>
              <td>{c.candidateId}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>
                <button
                  className="send-email-btn"
                  onClick={() => handleSendEmail(c.candidateId)}
                  disabled={c.emailSent}
                >
                  {c.emailSent ? "Email Sent ✅" : "Send Email"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShortlistedCandidates;

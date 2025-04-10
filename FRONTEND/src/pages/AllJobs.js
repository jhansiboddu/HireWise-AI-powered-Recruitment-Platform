import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css"; // reuse the table styling

const AllJobs = () => {
  const [jobMatches, setJobMatches] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/job-matches")
      .then(res => setJobMatches(res.data))
      .catch(err => console.error("Error fetching job match data:", err));
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">All Job Matches</h2>
      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Title</th>
            <th>Matches Found</th>
            <th>Shortlisted Candidates</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobMatches.map((job) => (
            <tr key={job.job_id}>
              <td>{job.job_id}</td>
              <td>{job.job_title}</td>
              <td>{job.matches_found}</td>
              <td>{job.shortlisted_candidates}</td>
              <td>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllJobs;

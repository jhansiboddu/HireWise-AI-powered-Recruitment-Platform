// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./AllJobs.css"; // reuse the table styling

// const AllJobs = () => {
//   const [jobMatches, setJobMatches] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8000/job-matches")
//       .then(res => setJobMatches(res.data))
//       .catch(err => console.error("Error fetching job match data:", err));
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <h2 className="dashboard-title">All Job Matches</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Job ID</th>
//             <th>Job Title</th>
//             <th>Matches Found</th>
//             <th>Shortlisted Candidates</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobMatches.map((job) => (
//             <tr key={job.job_id}>
//               <td>{job.job_id}</td>
//               <td>{job.job_title}</td>
//               <td>{job.matches_found}</td>
//               <td>{job.shortlisted_candidates}</td>
//               <td>{job.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllJobs;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllJobs.css";

const AllJobs = () => {
  const [jobMatches, setJobMatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/job-matches")
      .then(res => setJobMatches(res.data))
      .catch(err => console.error("Error fetching job match data:", err));
  }, []);

  const handleViewCandidates = async (jobId, jobTitle) => {
    try {
      const res = await axios.get("http://localhost:8000/shortlist/shortlisted", {
        params: { job_id: jobId, format: "json" }
      });
  
      console.log("Raw response from backend:", res.data);
  
      const rawCandidates = res.data.candidates || []; // fallback in case key doesn't exist
      const mappedCandidates = rawCandidates.map(([candidateId, name, email, score]) => ({
        candidateId,
        name,
        email,
        score,
      }));
  
      setSelectedJobTitle(jobTitle);
      setCandidates(mappedCandidates);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    }
  };
  
  

  const closeModal = () => {
    setShowModal(false);
    setCandidates([]);
    setSelectedJobTitle("");
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">All Job Matches</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Title</th>
            <th>Matches Found</th>
            <th>Shortlisted Candidates</th>
            <th>Status</th>
            <th>View</th>
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
              <td>
                <button
                  className="view-btn"
                  onClick={() => handleViewCandidates(job.job_id, job.job_title)}
                >
                  View Candidates
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Candidates for {selectedJobTitle}</h3>

            {Array.isArray(candidates) && candidates.length > 0 ? (
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Candidate ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Match %</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((c, index) => (
                    <tr key={index}>
                      <td>{c.candidateId}</td>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.score}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No shortlisted candidates available.</p>
            )}

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <button onClick={closeModal} className="close-btn">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllJobs;

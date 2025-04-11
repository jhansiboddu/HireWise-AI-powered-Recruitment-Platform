

// import React, { useEffect, useState } from "react";
// import axios from "../axios";
// import "./AllJobs.css";
// import { useNavigate } from "react-router-dom";
// // ...same imports

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     total_jobs: 0,
//     total_candidates: 0,
//     total_matches: 0,
//     shortlisted_candidates: 0,
//   });

//   const [jobMatches, setJobMatches] = useState([]);
//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [candidates, setCandidates] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedJobTitle, setSelectedJobTitle] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/dashboard_summary")
//       .then((res) => setStats(res.data))
//       .catch((err) => console.error("Error fetching dashboard data:", err));

//     axios
//       .get("http://localhost:8000/job-matches")
//       .then((res) => setJobMatches(res.data))
//       .catch((err) => console.error("Error fetching job match data:", err));
//   }, []);

//   const handleViewCandidates = async (jobId, jobTitle) => {
//     try {
//       setSelectedJobId(jobId);
//       setSelectedJobTitle(jobTitle);
//       setShowModal(true);

//       const res = await axios.get("/shortlist/shortlisted", {
//         params: { job_id: jobId, format: "json" },
//       });

//       const enrichedCandidates = res.data.map((c) => ({
//         ...c,
//         emailSent: false,
//       }));

//       setCandidates(enrichedCandidates);
//     } catch (err) {
//       console.error("Error fetching candidates:", err);
//     }
//   };

//   const handleSendEmail = async (candidateId) => {
//     try {
//       await axios.post(
//         "/shortlist/send_email/",
//         new URLSearchParams({
//           candidate_id: candidateId,
//           job_id: selectedJobId,
//         }),
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       );

//       setCandidates((prev) =>
//         prev.map((c) =>
//           c.candidateId === candidateId ? { ...c, emailSent: true } : c
//         )
//       );

//       alert("Email sent!");
//     } catch (err) {
//       console.error("Error sending email:", err);
//       alert("Failed to send email.");
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setCandidates([]);
//     setSelectedJobTitle("");
//     setSelectedJobId(null);
//   };

//   return (
//     <div className="dashboard-container">
//       <h2 className="dashboard-title">HireWise Dashboard</h2>

//       {/* STAT CARDS */}
//       <div className="card-container">
//         <div className="card"><h3>Total Jobs</h3><p>{stats.total_jobs}</p></div>
//         <div className="card"><h3>Total Candidates</h3><p>{stats.total_candidates}</p></div>
//         <div className="card"><h3>Total Matches</h3><p>{stats.total_matches}</p></div>
//         <div className="card"><h3>Shortlisted Candidates</h3><p>{stats.shortlisted_candidates}</p></div>
//       </div>

//       {/* JOB MATCHES TABLE */}
//       <h3 className="section-title">Job Matches</h3>
//       <table className="styled-table">
//         <thead>
//           <tr>
//             <th>Job ID</th>
//             <th>Job Title</th>
//             <th>Matches Found</th>
//             <th>Shortlisted Candidates</th>
//             <th>View</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobMatches.map((job) => (
//             <tr key={job.job_id}>
//               <td>{job.job_id}</td>
//               <td>{job.job_title}</td>
//               <td>{job.matches_found}</td>
//               <td>{job.shortlisted_candidates}</td>
//               <td>
//                 <button
//                   className="view-btn"
//                   onClick={() => handleViewCandidates(job.job_id, job.job_title)}
//                 >
//                   View Candidates
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* CANDIDATE MODAL */}
//       {showModal && (
//         <div style={{ position: "fixed", top: 0, left: 0, backgroundColor: "rgba(0,0,0,0.6)", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
//           <div style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "10px", width: "600px", maxHeight: "80vh", overflowY: "auto" }}>
//             <h3>Candidates for {selectedJobTitle}</h3>
            
//             {Array.isArray(candidates) && candidates.length > 0 ? (
//               <table className="styled-table">
//                 <thead>
//                   <tr>
//                     <th>Candidate ID</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Match %</th>
//                     <th>Send Email</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {candidates.map((c, index) => (
//                     <tr key={index}>
//                       <td>{c.candidateId}</td>
//                       <td>{c.name}</td>
//                       <td>{c.email}</td>
//                       <td>{c.score}%</td>
//                       <td>
//                         <button
//                           onClick={() => handleSendEmail(c.candidateId)}
//                           disabled={c.emailSent}
//                           className="send-email-btn"
//                         >
//                           {c.emailSent ? "Email Sent ✅" : "Send Email"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>No shortlisted candidates available.</p>
//             )}

//             <div style={{ textAlign: "center", marginTop: "1rem" }}>
//               <button onClick={closeModal} className="close-btn">Close</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* MORE BUTTON */}
//       <div className="more-button-container" style={{ textAlign: "center", marginTop: "1rem" }}>
//         <button onClick={() => navigate("/all-jobs")} className="more-button">
//           View All Jobs
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./AllJobs.css";
import { useNavigate } from "react-router-dom";

// ✅ Animated Counter Component
const Counter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 100; 
    const stepTime = Math.max(Math.floor(duration / end), 20);
    const interval = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(interval);
    }, stepTime);
    return () => clearInterval(interval);
  }, [end]);

  return <p>{count}</p>;
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_jobs: 0,
    total_candidates: 0,
    total_matches: 0,
    shortlisted_candidates: 0,
  });

  const [jobMatches, setJobMatches] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard_summary")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching dashboard data:", err));

    axios
      .get("http://localhost:8000/job-matches")
      .then((res) => setJobMatches(res.data))
      .catch((err) => console.error("Error fetching job match data:", err));
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

  const handleSendEmail = async (candidateId) => {
    try {
      await axios.post(
        "/shortlist/send_email/",
        new URLSearchParams({
          candidate_id: candidateId,
          job_id: selectedJobId,
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

  const closeModal = () => {
    setShowModal(false);
    setCandidates([]);
    setSelectedJobTitle("");
    setSelectedJobId(null);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">HireWise Dashboard</h2>

      {/* STAT CARDS with animated counters */}
      <div className="card-container">
        <div className="card"><h3>Total Jobs</h3><Counter end={stats.total_jobs} /></div>
        <div className="card"><h3>Total Candidates</h3><Counter end={stats.total_candidates} /></div>
        <div className="card"><h3>Total Matches</h3><Counter end={stats.total_matches} /></div>
        <div className="card"><h3>Shortlisted Candidates</h3><Counter end={stats.shortlisted_candidates} /></div>
      </div>

      {/* JOB MATCHES TABLE - only top 10 */}
      <h3 className="section-title">Job Matches</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Title</th>
            <th>Matches Found</th>
            <th>Shortlisted Candidates</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {jobMatches.slice(0, 10).map((job) => (
            <tr key={job.job_id}>
              <td>{job.job_id}</td>
              <td>{job.job_title}</td>
              <td>{job.matches_found}</td>
              <td>{job.shortlisted_candidates}</td>
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

      {/* CANDIDATE MODAL */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, backgroundColor: "rgba(0,0,0,0.6)", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "10px", width: "600px", maxHeight: "80vh", overflowY: "auto" }}>
            <h3>Candidates for {selectedJobTitle}</h3>
            {Array.isArray(candidates) && candidates.length > 0 ? (
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Candidate ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Match %</th>
                    <th>Send Email</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((c, index) => (
                    <tr key={index}>
                      <td>{c.candidateId}</td>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.score}%</td>
                      <td>
                        <button
                          onClick={() => handleSendEmail(c.candidateId)}
                          disabled={c.emailSent}
                          className="send-email-btn"
                        >
                          {c.emailSent ? "Email Sent ✅" : "Send Email"}
                        </button>
                      </td>
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

      {/* VIEW ALL BUTTON */}
      <div className="more-button-container" style={{ textAlign: "center", marginTop: "1rem" }}>
        <button onClick={() => navigate("/all-jobs")} className="more-button">
          View All Jobs
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

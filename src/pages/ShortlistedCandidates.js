// // // import React, { useEffect, useState } from "react";
// // // import axios from "../axios";

// // // export default function ShortlistedCandidates() {
// // //   const [candidates, setCandidates] = useState([]);

// // //   useEffect(() => {
// // //     const fetchShortlisted = async () => {
// // //       try {
// // //         const res = await axios.get("/shortlist/shortlisted");
// // //         setCandidates(res.data); // Expected format: [{candidate_id, name, email, match_score, job_id}]
// // //       } catch (err) {
// // //         console.error("Error fetching shortlisted candidates:", err);
// // //       }
// // //     };

// // //     fetchShortlisted();
// // //   }, []);

// // //   const handleSendEmail = async (jobId, candidateId) => {
// // //     try {
// // //       await axios.post(`/shortlist/send_email/${jobId}/${candidateId}`);
// // //       alert("Email sent successfully!");
// // //     } catch (err) {
// // //       alert("Error sending email.");
// // //       console.error(err);
// // //     }
// // //   };

// // //   return (
// // //     <div className="container">
// // //       <h2>Shortlisted Candidates</h2>
// // //       {candidates.length === 0 ? (
// // //         <p>No shortlisted candidates yet.</p>
// // //       ) : (
// // //         <table className="shortlist-table">
// // //           <thead>
// // //             <tr>
// // //               <th>Name</th>
// // //               <th>Email</th>
// // //               <th>Match Score</th>
// // //               <th>Job ID</th>
// // //               <th>Send Email</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {candidates.map(({ candidate_id, name, email, match_score, job_id }) => (
// // //               <tr key={candidate_id}>
// // //                 <td>{name}</td>
// // //                 <td>{email}</td>
// // //                 <td>{match_score}%</td>
// // //                 <td>{job_id}</td>
// // //                 <td>
// // //                   <button
// // //                     className="button"
// // //                     onClick={() => handleSendEmail(job_id, candidate_id)}
// // //                   >
// // //                     Send Email
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       )}
// // //     </div>
// // //   );
// // // }
// import React, { useEffect, useState } from "react";
// import axios from "../axios";

// const ShortlistedCandidates = () => {
//   const [jobId, setJobId] = useState(1); // default job_id
//   const [htmlContent, setHtmlContent] = useState("");

//   const fetchShortlisted = async () => {
//     try {
//       const res = await axios.get("/shortlist/shortlisted", {
//         params: { job_id: jobId },
//         headers: {
//           Accept: "text/html",
//         },
//       });
//       setHtmlContent(res.data);
//     } catch (err) {
//       console.error("Error fetching shortlisted candidates:", err);
//     }
//   };

//   useEffect(() => {
//     fetchShortlisted();
//   }, [jobId]);

//   return (
//     <div className="shortlisted-container">
//       <h1>Shortlisted Candidates</h1>

//       <div className="dropdown-container">
//         <label htmlFor="jobId">Select Job ID: </label>
//         <select
//           id="jobId"
//           value={jobId}
//           onChange={(e) => setJobId(Number(e.target.value))}
//         >
//           <option value={19}>Job 19</option>
//           <option value={5}>Job 5</option>
//           <option value={3}>Job 3</option>
//           {/* Add more options as needed */}
//         </select>
//       </div>

//       <div
//         className="html-output"
//         dangerouslySetInnerHTML={{ __html: htmlContent }}
//       />
//     </div>
//   );
// };

// export default ShortlistedCandidates;


// // import React, { useEffect, useState } from "react";
// // import axios from "../axios";
// // import "./ShortlistedCandidates.css";

// // const ShortlistedCandidates = () => {
// //   const [jobId, setJobId] = useState(1);
// //   const [candidates, setCandidates] = useState([]);
// //   const [sendingStatus, setSendingStatus] = useState({});

// //   const fetchCandidates = async () => {
// //     try {
// //       const res = await axios.get("/shortlist/shortlisted", {
// //         params: { job_id: jobId },
// //       });

// //       const fetched = res?.data?.candidates;

// //       // Defensive check to ensure it's always an array
// //       if (Array.isArray(fetched)) {
// //         setCandidates(fetched);
// //       } else {
// //         setCandidates([]); // fallback
// //       }

// //       setSendingStatus({});
// //     } catch (err) {
// //       console.error("Error fetching shortlisted candidates:", err);
// //       setCandidates([]); // fallback on error too
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCandidates();
// //   }, [jobId]);

// //   const sendEmail = async (candidateId) => {
// //     setSendingStatus((prev) => ({ ...prev, [candidateId]: "sending" }));
// //     try {
// //       await axios.post(
// //         "/shortlist/send_email/",
// //         new URLSearchParams({
// //           candidate_id: candidateId,
// //           job_id: jobId,
// //         }),
// //         {
// //           headers: {
// //             "Content-Type": "application/x-www-form-urlencoded",
// //           },
// //         }
// //       );
// //       setSendingStatus((prev) => ({ ...prev, [candidateId]: "sent" }));
// //       alert("Email sent!");
// //       fetchCandidates();
// //     } catch (err) {
// //       console.error("Error sending email:", err);
// //       alert("Error sending email");
// //       setSendingStatus((prev) => ({ ...prev, [candidateId]: "error" }));
// //     }
// //   };

// //   return (
// //     <div className="shortlisted-container">
// //       <h1>Shortlisted Candidates</h1>

// //       <div className="dropdown-container">
// //         <label htmlFor="jobId">Select Job ID: </label>
// //         <select
// //           id="jobId"
// //           value={jobId}
// //           onChange={(e) => setJobId(Number(e.target.value))}
// //         >
// //           <option value={1}>Job 1</option>
// //           <option value={2}>Job 2</option>
// //           <option value={5}>Job 5</option>
// //         </select>
// //       </div>

// //       <p>Total candidates found: {Array.isArray(candidates) ? candidates.length : 0}</p>

// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Email</th>
// //             <th>Score</th>
// //             <th>Action</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //   {Array.isArray(candidates) &&
// //     candidates.map((candidate) => {
// //       const status = sendingStatus[candidate.id]; // 👈 use 'id'
// //       return (
// //         <tr key={candidate.id}>
// //           <td>{candidate.name}</td>
// //           <td>{candidate.email}</td>
// //           <td>{candidate.score}</td>
// //           <td>
// //             <button
// //               onClick={() => sendEmail(candidate.id)}
// //               disabled={status === "sending" || status === "sent"}
// //             >
// //               {status === "sending"
// //                 ? "Sending..."
// //                 : status === "sent"
// //                 ? "Email Sent ✅"
// //                 : "Send Email"}
// //             </button>
// //           </td>
// //         </tr>
// //       );
// //     })}
// // </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default ShortlistedCandidates;
// import React, { useEffect, useState } from "react";
// import axios from "../axios";

// const ShortlistedCandidates = () => {
//   const [jobId, setJobId] = useState(5);
//   const [htmlContent, setHtmlContent] = useState("");

//   useEffect(() => {
//     const fetchShortlisted = async () => {
//       try {
//         const res = await axios.get("/shortlist/shortlisted", {
//           params: { job_id: jobId },
//           headers: {
//             Accept: "text/html",
//           },
//         });
//         setHtmlContent(res.data);
//       } catch (err) {
//         console.error("Error fetching shortlisted candidates:", err);
//       }
//     };

//     fetchShortlisted();
//   }, [jobId]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const listItems = document.querySelectorAll(".html-output li");

//       listItems.forEach((li) => {
//         // Don't add multiple buttons
//         if (li.querySelector(".send-email-btn")) return;

//         const text = li.innerText;
//         const match = text.match(/^(\d+)\s*-\s*/); // Extract candidate ID
//         const candidateId = match?.[1];

//         const btn = document.createElement("button");
//         btn.innerText = "Send Email";
//         btn.className = "send-email-btn";
//         btn.style.marginLeft = "10px";

//         btn.onclick = async () => {
//           try {
//             await axios.post(
//               "/shortlist/send_email/",
//               new URLSearchParams({
//                 candidate_id: candidateId,
//                 job_id: jobId,
//               }),
//               {
//                 headers: {
//                   "Content-Type": "application/x-www-form-urlencoded",
//                 },
//               }
//             );
//             btn.innerText = "Email Sent ✅";
//             btn.disabled = true;
//             alert("Email sent!");
//           } catch (err) {
//             console.error("Error sending email:", err);
//             alert("Failed to send email.");
//           }
//         };

//         li.appendChild(btn);
//       });
//     }, 300); // delay for DOM rendering

//     return () => clearTimeout(timer);
//   }, [htmlContent, jobId]);

//   return (
//     <div className="shortlisted-container">
//       <h1>Shortlisted Candidates</h1>

//       <div className="dropdown-container">
//         <label htmlFor="jobId">Select Job ID: </label>
//         <select
//           id="jobId"
//           value={jobId}
//           onChange={(e) => setJobId(Number(e.target.value))}
//         >
//           <option value={19}>Job 19</option>
//           <option value={5}>Job 5</option>
//           <option value={3}>Job 3</option>
//         </select>
//       </div>

//       <div
//         className="html-output"
//         dangerouslySetInnerHTML={{ __html: htmlContent }}
//       />
//     </div>
//   );
// };

// export default ShortlistedCandidates;


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
          <option value={9}>Job 9</option>
          <option value={3}>Job 3</option>
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


// import React, { useState, useRef } from "react";
// import axios from "../axios";
// import "./UploadResume.css";

// const CVUploader = () => {
//   const [cvFile, setCvFile] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file) setCvFile(file);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setCvFile(file);
//   };

//   const uploadCV = async () => {
//     const formData = new FormData();
//     formData.append("file", cvFile);

//     try {
//       await axios.post("/resume/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("CV uploaded successfully ✅");
//     } catch (err) {
//       console.error("Error uploading CV", err);
//       alert("Failed to upload CV ❌");
//     }
//   };

//   return (
//     <div className="upload-wrapper">
//       <h2>Upload Curriculum Vitae (CV)</h2>

//       <div
//         className="dropzone"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//         onClick={() => fileInputRef.current.click()}
//       >
//         <p>
//           Drag and drop CV file here or <span className="click-to-select">click to select</span>
//         </p>
//         {cvFile && <p className="filename">{cvFile.name}</p>}
//         <input
//           ref={fileInputRef}
//           type="file"
//           onChange={handleFileChange}
//           accept=".pdf,.doc,.docx,.txt"
//           style={{ display: "none" }}
//         />
//       </div>

//       <button onClick={uploadCV} disabled={!cvFile}>
//         Upload CV
//       </button>
//     </div>
//   );
// };

// export default CVUploader;
import React, { useState } from "react";
import axios from "../axios";
import "./UploadResume.css";

const CVUploader = () => {
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setCvFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const uploadCV = async () => {
    setLoading(true); // start loading

    const formData = new FormData();
    formData.append("file", cvFile);

    try {
      await axios.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Matching done successfully");
    } catch (err) {
      console.error("Error uploading CV", err);
      alert("uploaded CV");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div
      className="dropzone"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#111827" }}>
        Upload Curriculum Vitae (CV)
      </h2>

      <p>
        Drag and drop CV file here or{" "}
        <label htmlFor="cvInput" className="upload-label">
          click to select
        </label>
        
      </p>
      <p>After uploading the CV,we automatically match it with the job descrptions</p>

      <input id="cvInput" type="file" onChange={handleFileChange} />

      {cvFile && <p className="filename">{cvFile.name}</p>}

      <button disabled={!cvFile} onClick={uploadCV}>
      {loading ? "Uploading..." : "Upload CV"}
      </button>
    </div>
  );
};

export default CVUploader;

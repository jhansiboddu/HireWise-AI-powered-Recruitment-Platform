import React, { useState, useRef } from "react";
import axios from "../axios";
import "./UploadJD.css";

const UploadJD = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const dropRef = useRef();

  const handleFile = (selectedFile) => {
    if (selectedFile && selectedFile.name.match(/\.(xlsx|xls|csv)$/)) {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid Excel file (.xlsx or .xls or .csv)");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
    dropRef.current.classList.remove("drag-over");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.classList.add("drag-over");
  };

  const handleDragLeave = () => {
    dropRef.current.classList.remove("drag-over");
  };

  const handleClick = () => {
    document.getElementById("jd-file-input").click();
  };

  const handleUpload = async () => {
    if (!file) return alert("No file selected");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await axios.post("/jd/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(`JD uploaded: ${res.data.filename}`);
      setFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload JD.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-jd-container">
      <h2>Upload Job Description (JD)</h2>

      <div
        ref={dropRef}
        className="drag-drop-box"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {file ? (
          <p>{file.name}</p>
        ) : (
          <p>Drag and drop JD Excel file here or click to select</p>
        )}
      </div>

      <input
        id="jd-file-input"
        type="file"
        accept=".xlsx,.xls,.csv"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />

      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload JD"}
      </button>
    </div>
  );
};

export default UploadJD;

import React, { useState } from "react";
import axios from "../axios";

const MatchCVJD = () => {
  const [matchScore, setMatchScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    setLoading(true);
    setMatchScore(null);

    try {
      const response = await axios.post("/match-score/run-matching");
      setMatchScore(response.data.match_score);
    } catch (err) {
      console.error("Match failed", err);
      alert("Error matching CV and JD ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dropzone">
      <h3>Click Below to Match CVs with JDs</h3>
      <button onClick={handleMatch} disabled={loading}>
        {loading ? "Matching..." : "Match"}
      </button>

      {matchScore !== null && (
        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
          ✅ Match Score: {matchScore}%
        </p>
      )}
    </div>
  );
};

export default MatchCVJD;

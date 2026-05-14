import React from "react";
import { useNavigate } from "react-router-dom";

const Shorts = () => {

  const navigate = useNavigate();

  return (

    <div style={{ padding: "40px" }}>

      <button
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1>Short Videos</h1>

    </div>
  );
};

export default Shorts;
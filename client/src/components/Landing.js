import React from "react";
import "../style/style.css";

const Landing = () => {
  return (
    <div id="landing">
      <h3 style={{ fontFamily: "helvetica" }}>
        Review and share <br /> your favorite{" "}
        <span className="landing-movie">movies</span>
      </h3>
    </div>
  );
};

export default Landing;

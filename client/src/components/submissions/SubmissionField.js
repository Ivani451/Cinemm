import React from "react";

// redux-form has some pre-made props that are stored in "input" and in "meta"
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <div className="field-input">
        <input {...input} style={{ marginBottom: "5px" }} />
      </div>

      <div className="black-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

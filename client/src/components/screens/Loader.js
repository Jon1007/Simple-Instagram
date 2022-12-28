import React from "react";

function Loader(props) {
  return (
    <div className="progress" style={{ marginTop: "25%" }}>
      <div className="indeterminate"></div>
    </div>
  );
}

export default Loader;

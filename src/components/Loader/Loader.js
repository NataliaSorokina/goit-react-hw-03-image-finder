import React from "react";
import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function ReactLoader() {
  return (
    <Loader
      type="Circles"
      color="#00BFFF"
      height={80}
      width={80}
      timeout={3000}
      style={{
        marginLeft: "650px",
        marginTop: "30px",
        marginBottom: "0px",
      }}
    />
  );
}

export default ReactLoader;

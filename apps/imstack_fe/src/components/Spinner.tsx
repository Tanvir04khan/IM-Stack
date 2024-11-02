import React from "react";

const Spinner = () => {
  return (
    <div className="h-[100vh] w-[100vw] fixed top-0 left-0 flex items-center justify-center z-50">
      <div className="spinner" />
    </div>
  );
};

export default Spinner;

import React from "react";

function Errors({ authErr }) {
  return authErr?.map((error) => {
    return <p className="mb-2 text-red-800 font-lg font-semibold">*{error}</p>;
  });
}

export default Errors;

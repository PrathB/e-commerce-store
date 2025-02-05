import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="unauthorized">
      <h1>403 - Unauthorized Access</h1>
      <p>You do not have permission to access this page.</p>
      <p>
        Please contact the administrator if you believe this is an error or{" "}
        <Link to="/">go back to the homepage</Link>.
      </p>
    </div>
  );
};

export default Unauthorized;

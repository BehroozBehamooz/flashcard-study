import React from "react";
import {Link} from "react-router-dom"
function NotFound() {
  return (
    <div className="NotFound">
      <h1>Not Found</h1>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default NotFound;

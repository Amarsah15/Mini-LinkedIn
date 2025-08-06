import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
    <h1 className="text-6xl font-bold text-linkedin-blue">404</h1>
    <p className="text-gray-600">Page not found.</p>
    <Link to="/" className="btn-primary">
      Back to Home
    </Link>
  </div>
);

export default NotFoundPage;

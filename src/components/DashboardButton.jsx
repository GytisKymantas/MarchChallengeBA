import React from "react";
import "../styles/app.scss";

const DashboardButton = ({ onClick, loading, icon }) => {
  return (
    <div className="dashboard__button-container">
      <button
        onClick={onClick}
        disabled={loading}
        className={`dashboard__button ${
          loading ? "dashboard__button--disabled" : ""
        }`}
      >
        <img src={icon} alt="icon" />
        {loading ? "Loading..." : "Hit here to refresh gifs or press space"}
      </button>
    </div>
  );
};

export default DashboardButton;

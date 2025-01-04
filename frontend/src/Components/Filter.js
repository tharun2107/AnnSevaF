import React, { useMemo, useState } from "react";
import "./styles/Filter.css";

import { useNavigate } from "react-router-dom";

import FilterLogic from "./FilterLogic";

const Filter = ({
  frequests,
  forganizations,
  setRequests,
  setOrganizations,
  fvolunteers,
  zoom,
  setzoom,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [needVolunteers, setNeedVolunteers] = useState(false);
  const [volunteers, setVolunteers] = useState([]);

  const navigate = useNavigate();

  const { handlefilterforrequests, handlefilterforvolunteers } = FilterLogic(
    frequests,
    forganizations,
    setRequests,
    setOrganizations,
    selectedFilter,
    setVolunteers,
    fvolunteers,
  );

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    handlefilterforrequests();
    handlefilterforvolunteers();

    if (filter === "5km") {
      setzoom(18);
    } else if (filter === "10km") {
      setzoom(16);
    } else if (filter === "city") {
      setzoom(14);
    } else {
      setzoom(12);
    }

  };

  const handleCheckboxChange = (event) => {
    setNeedVolunteers(event.target.checked);
    handlefilterforvolunteers();
    if (event.target.checked) {
      navigate("/dvolunteers", {
        state: {
          volunteers: fvolunteers,
        },
      });
    }
  };

  return (
    <div className="filter-container">
      <div className="filter-buttons">
        <button
          className={`filter-button ${
            selectedFilter === "5km" ? "active" : ""
          }`}
          onClick={() => handleFilterClick("5km")}
        >
          5km
        </button>
        <button
          className={`filter-button ${
            selectedFilter === "10km" ? "active" : ""
          }`}
          onClick={() => handleFilterClick("10km")}
        >
          10km
        </button>
        <button
          className={`filter-button ${
            selectedFilter === "city" ? "active" : ""
          }`}
          onClick={() => handleFilterClick("city")}
        >
          City
        </button>
        <button
          className={`filter-button ${
            selectedFilter === "all" ? "active" : ""
          }`}
          onClick={() => handleFilterClick("all")}
        >
          All
        </button>
      </div>
      <div className="filter-checkbox">
        <label>
          <input
            type="checkbox"
            checked={needVolunteers}
            onChange={handleCheckboxChange}
          />
          Need Volunteers
        </label>
      </div>
    </div>
  );
};

export default Filter;

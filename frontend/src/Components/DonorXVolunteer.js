import React from "react";

import "./styles/VolunteerTable.css";

import { useLocation } from "react-router-dom";
import { useState } from "react";

import VolunteerFilter from "./VFilter";

const DonorXVolunteerPage = () => {
  const location = useLocation();
  const volunteers = location.state?.volunteers || [];

  const [cvolunteers, setCvolunteers] = useState([]);

  const getvols = () => {
    if (cvolunteers.length > 0) {
      return cvolunteers;
    }
    return volunteers;
  };

  return (
    <div className="volunteer-table-container">
      <VolunteerFilter
        volunteers={volunteers}
        setCvolunteers={setCvolunteers}
      />
      <h2>Volunteer Information</h2>
      {volunteers.length > 0 ? (
        <table className="volunteer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {getvols().map((volunteer) => (
              <tr key={volunteer.id || volunteer._id}>
                <td>{volunteer.name}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.phone}</td>
                <td>{volunteer.location.landmark || "N/A"}</td>
                <td>{volunteer.isActive ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No volunteers available.</p>
      )}
    </div>
  );
};

export default DonorXVolunteerPage;

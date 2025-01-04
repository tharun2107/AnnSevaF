import React, { useState } from "react";

const VolunteerFilter = ({ volunteers, setCvolunteers }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const user = JSON.parse(localStorage.getItem("user"));
  const userloc = user.location;

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    console.log(`Selected filter: ${filter}`); // Replace with desired action

    if(filter === "5km") {
      setCvolunteers(volunteers.filter((volunteer) => {
        const distance = calculateDistance(
          volunteer.location.lat,
          volunteer.location.long,
          userloc.lat,
          userloc.long
        );
        return distance <= 5;
      }));
    } else if(filter === "10km") {
      setCvolunteers(volunteers.filter((volunteer) => {
        const distance = calculateDistance(
          volunteer.location.lat,
          volunteer.location.long,
          userloc.lat,
          userloc.long
        );
        if(distance <= 10) {
          console.log(volunteer.name);
        }
        return distance <= 10;
      }));
    } else if(filter === "city") {
      setCvolunteers(volunteers.filter((volunteer) => {
        const distance = calculateDistance(
          volunteer.location.lat,
          volunteer.location.long,
          userloc.lat,
          userloc.long
        );
        if(distance <= 50) {
          console.log(volunteer.name);
        }
        return distance <= 50;
      }));
    } else if(filter === "all") {
      setCvolunteers(volunteers);
    }

  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px",
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "#f4f4f4",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "20px auto",
      }}
    >
      {["5km", "10km", "city", "all"].map((filter) => (
        <label
          key={filter}
          style={{
            cursor: "pointer",
            padding: "10px 15px",
            backgroundColor: selectedFilter === filter ? "#007bff" : "#fff",
            color: selectedFilter === filter ? "#fff" : "#333",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "14px",
            fontWeight: "bold",
            transition: "all 0.3s",
          }}
          onClick={() => handleFilterChange(filter)}
        >
          {filter}
        </label>
      ))}
    </div>
  );
};

export default VolunteerFilter;

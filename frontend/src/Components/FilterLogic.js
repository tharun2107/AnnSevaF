import React, { use } from "react";
import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";

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

function filterrequests() {}

function Filter(
  frequests,
  forganizations,
  setRequests,
  setOrganizations,
  selectedFilter,
  setVolunteers,
  fvolunteers,
) {
  const [currentuser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  // handle filter for requests
  function handlefilterforrequests() {
    if (selectedFilter === "5km") {
      console.log("im in 5km");
      setRequests(
        frequests.filter((request) => {
          const distance = calculateDistance(
            request.location.lat,
            request.location.long,
            currentuser.location.lat,
            currentuser.location.long
          );
          return distance <= 5;
        })
      );
      //   console.log(organizations);
      setOrganizations(
        forganizations.filter((organization) => {
          //   console.log(organization.location.lat);
          const distance = calculateDistance(
            organization.location.lat,
            organization.location.long,
            currentuser.location.lat,
            currentuser.location.long
          );
          return distance <= 5;
        })
      );
    } else if (selectedFilter === "10km") {
      setRequests(
        frequests.filter((request) => {
          const distance = calculateDistance(
            request.location.lat,
            request.location.long,
            currentuser.location.lat,
            currentuser.location.long
          );
          return distance <= 10;
        })
      );
      setOrganizations(
        forganizations.filter((organization) => {
          const distance = calculateDistance(
            organization.location.lat,
            organization.location.long,
            currentuser.location.lat,
            currentuser.location.long
          );
          return distance <= 10;
        })
      );
    } else if (selectedFilter === "city") {
      setRequests(
        frequests.filter((request) => {
          const distance = calculateDistance(
            request.location.lat,
            request.location.long,
            currentuser.location.lat,
            currentuser.location.long
          );
          return distance <= 20;
        })
      );
      setOrganizations(
        forganizations.filter((organization) => {
          const distance = calculateDistance(
            organization.location.lat,
            organization.location.long,
            currentuser.location.lat,
            currentuser.location.long
          );
          return distance <= 20;
        })
      );
    } else {
      setRequests(frequests);
      setOrganizations(forganizations);
    }
  }

  // handle filter for volunteers
  function handlefilterforvolunteers() {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    // console.log(fvolunteers)
    if (selectedFilter === "5km") {
      setVolunteers(
        fvolunteers.filter((volunteer) => {
          const distance = calculateDistance(
            volunteer.location.lat,
            volunteer.location.long,
            currentuser.location.lat,
            currentuser.location.long
          );
          return distance <= 5;
        })
      );
    } else if (selectedFilter === "10km") {
      setVolunteers(
        fvolunteers.filter((volunteer) => {
          const distance = calculateDistance(
            volunteer.location.lat,
            volunteer.location.long,
            currentuser.location.lat,
            currentuser.location.long
          );
          return distance <= 10;
        })
      );
    } else if (selectedFilter === "city") {
      setVolunteers(
        fvolunteers.filter((volunteer) => {
          const distance = calculateDistance(
            volunteer.location.lat,
            volunteer.location.long,
            currentuser.location.lat,
            currentuser.location.long
          );
          return distance <= 20;
        })
      );
    } else {
      setVolunteers(fvolunteers);
    }
  }

  // return functionalities
  return {
    handlefilterforrequests,
    handlefilterforvolunteers,
  };
}

export default Filter;

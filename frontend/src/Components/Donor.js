import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import DonateForm from "./DonateForm";
import "./styles/Donor.css";
import axios from "axios";

import Filter from "./Filter";

// Custom marker icons
const donorIcon = new L.Icon({
  iconUrl:
    "https://cdn3d.iconscout.com/3d/premium/thumb/blood-donation-location-10321765-8355310.png",
  iconSize: [50, 50],
});

const orgIcon = new L.Icon({
  iconUrl:
    "https://static.vecteezy.com/system/resources/previews/015/088/548/non_2x/business-organization-location-vector.jpg",
  iconSize: [50, 50],
});

const requestIcon = new L.Icon({
  iconUrl:
    "https://png.pngtree.com/png-clipart/20191121/original/pngtree-vector-location-icon-png-image_5159127.jpg",
  iconSize: [50, 50],
});

// Haversine formula to calculate distance between two lat-lng points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in km
}

const DonorPage = () => {
  const donorfromls = JSON.parse(localStorage.getItem("user"));
  const [donorlocation, setdonorlocation] = useState({
    lat: donorfromls.location.lat,
    lng: donorfromls.location.long,
  });

  const [frequests, setFrequests] = useState([]);
  const [forganizations, setForganizations] = useState([]);
  const [activeRequests, setActiveRequests] = useState([]);
  const [activeOrganizations, setActiveOrganizations] = useState([]);
  const [activeForm, setActiveForm] = useState(null);

  const [needVolunteers, setNeedVolunteers] = useState(false);
  const [zoomlevel, setZoomlevel] = useState(20);

  const [volunteers, setvolunteers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        if (!token) {
          console.error("Token is missing.");
          return;
        }

        const response = await axios.get("http://localhost:3001/api/requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        try {
          const response = await axios.get(
            "http://localhost:3001/api/volunteers"
          );
          setvolunteers(response.data);
        } catch (error) {
          console.error("Error fetching volunteers:", error);
        }

        const data = response.data;
        const requests = data.requests || [];
        const organizations = data.organizations || [];

        setFrequests(requests);
        setForganizations(organizations);

        if (!activeRequests.length) {
          setActiveRequests(requests);
        }

        if (!activeOrganizations.length) {
          setActiveOrganizations(organizations);
        }
      } catch (error) {
        console.error("Error fetching donation data:", error);
      }
    };

    fetchData();
  }, []);

  const getrequests = () => {
    if (activeRequests.length > 0) {
      return activeRequests;
    } else {
      return frequests;
    }
  };

  const getorganizations = () => {
    if (activeOrganizations.length > 0) {
      return activeOrganizations;
    } else {
      return forganizations;
    }
  };

  return (
    <div className="donor-page">
      <div className="headeroffilter">
        <Filter
          frequests={frequests}
          forganizations={forganizations}
          setRequests={setActiveRequests}
          setOrganizations={setActiveOrganizations}
          fvolunteers={volunteers}
          zoom={zoomlevel}
          setzoom={setZoomlevel}
        />
      </div>
      <div
        className="donation-component"
        id="donation-component"
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <div className="map-container">
          <MapContainer
            center={donorlocation}
            zoom={zoomlevel}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={donorlocation} icon={donorIcon}>
              <Popup>Donor Location</Popup>
            </Marker>
            {[...activeRequests, ...activeOrganizations].map((item) => {
              // Check if loc.lat and loc.lng are valid numbers
              if (item) {
                const loc = item.location;
                const icon = item.role === "receiver" ? orgIcon : requestIcon;
                return (
                  <Marker
                    key={loc._id || loc.id}
                    position={[loc.lat, loc.long]}
                    icon={icon}
                  >
                    <Popup>{loc.name || "No Name"}</Popup>
                  </Marker>
                );
              }
              return null; // Skip invalid locations
            })}
          </MapContainer>
        </div>

        <div className="requests-container">
          <h3>Active Requests</h3>
          <ul>
            {getrequests().map((item) =>
              item._id ? (
                <li key={item._id} className="request">
                  <h4>{item.name || "Request"}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Phone: {item.phone}</p>
                  <p>Receiver ID: {item.receiverId}</p>
                  <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
                </li>
              ) : null
            )}
          </ul>

          <h3>Active Organizations</h3>
          <ul>
            {getorganizations().map((item) =>
              item._id ? (
                <li key={item._id} className="organization">
                  <h4>{item.name || "Organization"}</h4>
                  <p>Phone: {item.phone}</p>
                  <p>Is Active: {item.isActive ? "Yes" : "No"}</p>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DonorPage;

import React from "react";

const LocationAndDate = ({ location, date }) => {
  return (
    <div className="location-and-date">
      <h1 className="location-and-date__location">{location}</h1>
      <div>{date}</div>
    </div>
  );
};

export default LocationAndDate;

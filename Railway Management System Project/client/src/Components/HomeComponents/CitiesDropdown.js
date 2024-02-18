import React, { useEffect, useState } from "react";
// import allCities from "../../data/cititesData";
import stationService from "../../Services/station.service";
import { toast } from "react-toast";

const CityDropdown = ({allCities, selectedCity, onCityChange, disabledCities }) => {
  
    const availableCities = allCities.filter((city) => !disabledCities.includes(city));
  
    return (
      <select value={selectedCity} onChange={(e) => onCityChange(e.target.value)}>
        <option value="" disabled>
          Select a city
        </option>
        {availableCities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.stationName}
          </option>
        ))}
      </select>
    );
  };

  export default CityDropdown;
  
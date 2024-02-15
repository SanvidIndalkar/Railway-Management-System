import React from "react";
import allCities from "../../data/cititesData";

const CityDropdown = ({ selectedCity, onCityChange, disabledCities }) => {
  
    const availableCities = allCities.filter((city) => !disabledCities.includes(city));
  
    return (
      <select value={selectedCity} onChange={(e) => onCityChange(e.target.value)}>
        <option value="" disabled>
          Select a city
        </option>
        {availableCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    );
  };

  export default CityDropdown;
  
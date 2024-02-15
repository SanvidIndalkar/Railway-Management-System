import React from "react";

const NumericDateInput = ({ value, onChange }) => {
    const handleInputChange = (e) => {
        // Allow only numeric input
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        onChange(numericValue);
    };

    return <input type="text" value={value} onChange={handleInputChange} />;
};

export default NumericDateInput;
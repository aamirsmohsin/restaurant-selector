import React from 'react'
import { useState } from 'react'

function Dropdown({ items, selectionType, onSelect }) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        onSelect(event.target.value);
    }

    return (
        <div className="mb-3">
            <select value={selectedValue} className="form-select" onChange={handleChange}>
                <option value="">Select a {selectionType}</option>
                
                {items.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
                
            </select>
        </div>
    )
}

export default Dropdown;
import React from 'react';
import { useState } from 'react';

function Input( {onSelect} ) {
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setMessage(event.target.value);
        onSelect(event.target.value);
    }
    
    return (
        <div className="mb-3">
            <input 
                type="text"
                placeholder="Select an Address"
                value={message}
                onChange={handleChange}
                className="form-control"/>
        </div>
    )
}

export default Input;
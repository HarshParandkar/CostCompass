import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

const SpecificationQuery = () => {
    const [productName, setProductName] = useState('');
    const [specification1, setSpecification1] = useState('');  // First mandatory specification
    const [specification2, setSpecification2] = useState('');  // Second mandatory specification
    const [optionalSpecification, setOptionalSpecification] = useState('');  // Optional specification
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Prepare the specifications array
        const specifications = [specification1, specification2];
        if (optionalSpecification) {
            specifications.push(optionalSpecification);  // Add optional specification if it is provided
        }

        try {
            const response = await axios.post('http://localhost:5000/specification-query', {
                product_name: productName,
                specifications: specifications,  // Pass the specifications array
            });

            // Redirect to ResultsPage with the fetched data as state
            navigate('/results', { state: { results: response.data } });
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('No products found.');
            } else {
                setError('An error occurred while fetching the data.');
            }
        }
    };

    return (
        <div>
            <h2>Product Query by Specification</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                
                <input
                    type="text"
                    placeholder="Specification 1 (Mandatory)"
                    value={specification1}
                    onChange={(e) => setSpecification1(e.target.value)}
                    required
                />
                
                <input
                    type="text"
                    placeholder="Specification 2 (Mandatory)"
                    value={specification2}
                    onChange={(e) => setSpecification2(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Specification 3 (Optional)"
                    value={optionalSpecification}
                    onChange={(e) => setOptionalSpecification(e.target.value)}
                />

                <button type="submit">Search</button>
            </form>
            {error && <p>{error}</p>}
            <br></br>
            <div align="center">
             <Link to="/login" align="center">
                    <button>logout</button>
                </Link>
                <br></br>
                
            </div>
        </div>
    );
};

export default SpecificationQuery;

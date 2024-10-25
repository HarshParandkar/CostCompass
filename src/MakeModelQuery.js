import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MakeModelQuery = () => {
    const [productName, setProductName] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/make-model-query', {
                product_name: productName,
                make,
                model,
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
            <h2>Product Query by Make and Model</h2>
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
                    placeholder="Make"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                />
                <button type="submit">Search</button>
            </form>
            {error && <p>{error}</p>}
            <div align="center">
             <Link to="/login" align="center">
                    <button>logout</button>
                </Link>
                <br></br>
                
            </div>
        </div>
    );
};

export default MakeModelQuery;

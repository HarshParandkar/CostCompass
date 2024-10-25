import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const ResultsPage = () => {
    const location = useLocation();
    const { results } = location.state || {};  // Get the results from the state

    // Check if the results object exists and is in the correct format
    const amazonResults = results?.amazon || []; // Amazon results as an array
    const ebayResults = results?.ebay || []; // eBay results as an array

    // Check if there are any results at all
    if (amazonResults.length === 0 && ebayResults.length === 0) {
        return <div>No results found.</div>;
    }

    return (
        <div>
            <h1>Product Results</h1>
            
            {/* Amazon Results */}
            {amazonResults.length > 0 && (
                <>
                    <h2>Amazon Results</h2>
                    <table border="1" cellPadding="10" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Product Description</th>
                                <th>Price</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {amazonResults.map((product, index) => (
                                <tr key={`amazon-${index}`}>
                                    <td>{index + 1}</td> {/* S.No. (starts from 1) */}
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <a href={product.link} target="_blank" rel="noopener noreferrer">
                                            Visit Amazon Page
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {/* eBay Results */}
            {ebayResults.length > 0 && (
                <>
                    <h2>eBay Results</h2>
                    <table border="1" cellPadding="10" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Product Description</th>
                                <th>Price</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ebayResults.map((product, index) => (
                                <tr key={`ebay-${index}`}>
                                    <td>{index + 1}</td> {/* S.No. (starts from 1) */}
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <a href={product.link} target="_blank" rel="noopener noreferrer">
                                            Visit eBay Page
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            <br></br>
            <div align="center">
             <Link to="/login" align="center">
                    <button>logout</button>
                </Link>
                <br></br>
                <br></br>
                <Link to="/query" align="center">
                    <button>Search again</button>
                </Link>
            </div>

        </div>
    );
};

export default ResultsPage;


import React from 'react';
import { Link } from 'react-router-dom';

const QueryPage = () => {
    return (
        <div>
            <h2>Choose a Query Option</h2>
            <br></br>
            
            <div align="center">
                {/* Link to the query based on Make/Model */}
                <Link to="/query/make-model" >
                    <button>Query by Make/Model</button>
                    
                </Link>
                <br></br>
                <br></br>
                {/* Link to the query based on Specifications */}
                <Link to="/query/specification">
                    <button>Query by Specification</button>
                </Link>
            </div>
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

export default QueryPage;
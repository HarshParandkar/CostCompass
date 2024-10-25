import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import QueryPage from './QueryPage'; // Ensure this is imported
import MakeModelQuery from './MakeModelQuery'; // Import the new MakeModelQuery component
import SpecificationQuery from './SpecificationQuery'; // Import the SpecificationQuery component
import ResultsPage from './ResultsPage';
import './styles.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/query" element={<QueryPage />} />
          <Route path="/query/make-model" element={<MakeModelQuery />} /> {/* New route */}
          <Route path="/query/specification" element={<SpecificationQuery />} /> {/* New route */}
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

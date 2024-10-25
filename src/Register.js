import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(''); // Reset message

        try {
            const response = await axios.post('http://localhost:5000/register', {
                username,
                password
            });

            if (response && response.data.message) {
                setMessage(response.data.message); // Display message from server
                if (response.data.message === 'User registered successfully!') {
                    navigate('/login'); // Redirect to login after successful registration
                }
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
            <p >Already have an account? <Link to="/login">Login here</Link></p> {/* Link to Login */}
        </div>
    );
};

export default Register;

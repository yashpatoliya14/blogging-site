// components/ProtectedRoute.jsx
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    useEffect(() => {
        async function checkUserAuthenticate() {
            try {
                const res = await axios.get(`${BACKEND_URL}/authenticate`, {
                    withCredentials: true,
                });
                setIsAuthenticated(res.data.success);
            } catch (err) {
                setIsAuthenticated(false);
            }
        }
        checkUserAuthenticate()
    }, [BACKEND_URL])
    if (isAuthenticated === null) return <p>Loading...</p>;

    return isAuthenticated ? children : <Navigate to="/signin" replace />;
}

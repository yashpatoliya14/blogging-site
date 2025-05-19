// components/ProtectedRoute.jsx
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from './components/Loader';

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
    if (isAuthenticated === null) return <div className='flex flex-col items-center mt-[50%]'><Loader/></div>;

    return isAuthenticated ? children : <Navigate to="/signin" replace />;
}

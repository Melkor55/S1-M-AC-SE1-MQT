import logo from './logo.svg';
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigate, json } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Orders from './components/Orders';

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const [lastPathLogin, setLastPathLogin] = useState(false);

    useEffect(() => {
        console.log('Location changed',location);
        if(location ? (location.pathname === '/login' && !lastPathLogin) : false)
        {

        }
        else
        {
            navigate('/login');
            setLastPathLogin(true);    
        }
    },[]);
    return (
            <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/orders" element={<Orders />}/>
            </Routes>
    );
}

export default App;

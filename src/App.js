import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect } from "react";

function App() {
    const location = useLocation();

    useEffect(() => {
        // Update the body class based on the route
        if (location.pathname === '/') {
            document.body.classList.add('login-background');
        } else {
            document.body.classList.remove('login-background');
        }
    }, [location]);

    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
        </Routes>
      
    );
}

export default function WrappedApp() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

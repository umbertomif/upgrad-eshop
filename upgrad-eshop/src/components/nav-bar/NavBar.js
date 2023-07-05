import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography, InputBase } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

const NavBar = () => {
    const [user, setUser] = useState(null);
    const prevUser = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Retrieve user data from session storage
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    useEffect(() => {
        // Check if user role has changed
        if (prevUser.current && prevUser.current.roles !== user?.roles) {
            const storedUser = sessionStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            }
        }
        prevUser.current = user;
    }, [user]);

    const handleLogout = () => {
        // Clear the session
        sessionStorage.removeItem('user');
        // Clear user state
        setUser(null);
        // Redirect to login screen
        window.location.href = '/login';
    };

    const isAdmin = () => {
        if (user) {
            return user.roles.includes('ADMIN');
        }
        return false;
    };

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ color: '#3f51b5' }}>
                <Toolbar>
                    <ShoppingCartIcon sx={{ mr: 2, color: 'white' }} />
                    <Typography variant="h6" sx={{ mr: 2, color: 'white' }}>
                        upGrad E-Shop
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    {user !== null ? (
                        <>
                            <form onSubmit={handleSearchSubmit}>
                                <Box sx={{ width: 400, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 1, pl: 2, pr: 2 }}>
                                    <SearchIcon sx={{ mr: 1, color: 'white' }} />
                                    <InputBase
                                        sx={{ width: 400, color: 'white' }}
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={handleSearchQueryChange}
                                    />
                                </Box>
                            </form>
                            <Box sx={{ flexGrow: 1 }} />
                        </>
                    ) : null}
                    {user === null ? (
                        <>
                            <Link to="/login" className="linkMenu">
                                <Typography variant="body1" sx={{ mr: 2 }}>
                                    Login
                                </Typography>
                            </Link>
                            <Link to="/signup" className="linkMenu">
                                <Typography variant="body1" sx={{ mr: 2 }}>
                                    Sign Up
                                </Typography>
                            </Link>
                        </>
                    ) : null}
                    {user !== null ? (
                        <>
                            <Link to="/" underline="none" className="linkMenu">
                                <Typography variant="body1" sx={{ mr: 2 }}>
                                    Home
                                </Typography>
                            </Link>
                        </>
                    ) : null}
                    {isAdmin() && user !== null ? (
                        <>
                            <Link to="/product" underline="none" className="linkMenu">
                                <Typography variant="body1" sx={{ mr: 2 }}>
                                    Add Product
                                </Typography>
                            </Link>
                        </>
                    ) : null}
                    {user !== null ? (
                        <>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={handleLogout}
                            >
                                LOGOUT
                            </Button>
                        </>
                    ) : null}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar
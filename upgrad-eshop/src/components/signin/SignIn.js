import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Stack, Typography, TextField, Button, Alert, Snackbar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './SignIn.css';
import authService from '../../services/authService';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [error, setError] = useState(null);

    const initialState = () => {
        setUsernameError(null);
        setPasswordError(null);
        setError(null);
        setUsername('');
        setPassword('');
    };

    const validateForm = () => {
        if (username.trim() === '') {
            setUsernameError(true);
            return false;
        }
        if (password.trim() === '') {
            setPasswordError(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await authService.loginService(username, password);
                console.log('Login successful:', response);
                // Reset the form
                initialState();
                // Save user object to sessionStorage
                sessionStorage.setItem('user', JSON.stringify(response));
                // Redirect to home screen using window.location
                window.location.href = '/';
            } catch (error) {
                console.error('Login error:', error);
                setError(error.message);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setError(null);
    };

    return (
        <Container className="container">
            <form onSubmit={handleSubmit}>
                <Stack sx={{ alignItems: 'center' }} spacing={2}>
                    <LockOutlinedIcon
                        sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '10px',
                            fontSize: '32px',
                        }}
                    />
                    <Typography variant="h5">Sign In</Typography>
                </Stack>
                <Stack className="stack" spacing={2}>
                    <TextField
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={usernameError}
                        helperText={usernameError ? 'Username is required' : ''}
                        fullWidth
                        id="email"
                        label="Email Address"
                    />
                    <TextField
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError}
                        helperText={passwordError ? 'Password is required' : ''}
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                    />
                    {error &&
                        <Snackbar
                            open={!!error}
                            autoHideDuration={6000}
                            onClose={handleCloseSnackbar}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <Alert variant="filled" severity="error">
                                {error}
                            </Alert>
                        </Snackbar>
                    }
                    <Button variant="contained" type="submit">
                        Sign In
                    </Button>
                    <Link to="/signup">
                        <Typography variant="body2">Don't have an account? Sign Up</Typography>
                    </Link>
                </Stack>
            </form>
        </Container>
    );
};

export default SignIn;

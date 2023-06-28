import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Stack, Typography, TextField, Button } from '@mui/material'
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
    }
    const validateForm = () => {
        if (username.trim() === '') {
            setUsernameError(true);
            return false;
        }
        if (password.trim() === '') {
            setPasswordError(true);
            return false;
        }
        return true
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await authService.loginService(username, password);
                console.log('Login successful:', response);
                // Reset the form
                initialState();
                // save on session
                sessionStorage.setItem('user', JSON.stringify(response));
                // Redirect to home screen using useNavigate
                window.location.href = '/products';
            } catch (error) {
                console.error('Login error:', error);
                setError(error.message);
            }
        }
    };

    return (
        <Container className="container">
            <form onSubmit={handleSubmit}>
                <Stack sx={{ alignItems: "center" }} spacing={2}>
                    <LockOutlinedIcon
                        sx={{
                            backgroundColor: "red",
                            color: "white",
                            borderRadius: "50%",
                            padding: "10px",
                            fontSize: "32px",
                        }}
                    />
                    <Typography variant='h5'>
                        Sign In
                    </Typography>
                </Stack>
                <Stack className='stack' spacing={2} >
                    <TextField
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={usernameError}
                        helperText={usernameError ? 'Username is required' : ''}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                    />
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError}
                        helperText={passwordError ? 'Password is required' : ''}
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type='password'
                    />
                    {error && <Typography sx={{ color: 'red' }} variant='body2'>Error: {error}</Typography>}
                    <Button variant="contained" type="submit">
                        Sign In
                    </Button>
                    <Link to="/signup">
                        <Typography variant='body2'>
                            Don't have an account? Sign Up
                        </Typography>
                    </Link>
                </Stack>
            </form>
        </Container>
    );
}

export default SignIn;
import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { Container, Stack, Typography, TextField, Button, Alert, AlertTitle } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import authService from '../../services/authService';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState(null);

    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState(null);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(null);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

    const [isEqualPasswordError, setIsEqualPasswordError] = useState(null);

    const [contactNumber, setContactNumber] = useState('');
    const [contactNumberError, setContactNumberError] = useState(null);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const initialState = () => {
        setFirstNameError(null);
        setLastNameError(null);
        setEmailError(null);
        setPasswordError(null);
        setConfirmPassword(null);
        setContactNumberError(null);
        setError(null);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setContactNumber('');
    }
    const validateForm = () => {
        if (firstName.trim() === '') {
            setFirstNameError(true);
            return false;
        }
        if (lastName.trim() === '') {
            setLastNameError(true);
            return false;
        }
        if (email.trim() === '') {
            setEmailError(true);
            return false;
        }
        if (password.trim() === '') {
            setPasswordError(true);
            return false;
        }
        if (confirmPassword.trim() === '') {
            setConfirmPasswordError(true);
            return false;
        }
        if (contactNumber.trim() === '') {
            setContactNumberError(true);
            return false;
        }
        if (password.trim() !== confirmPassword) {
            setIsEqualPasswordError(true);
            return false;
        }
        return true
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await authService.signUpService(email, password, firstName, lastName, contactNumber);
                console.log('Sign Up successful:', response);
                // Reset the form
                initialState();
                // Set Success
                setSuccess(true);
            } catch (error) {
                console.error('Sign Up error:', error);
                setError(error.message);
            }
        }
    };

    return (
        <Container className="container">
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
                    Sign Up
                </Typography>
            </Stack>
            <form onSubmit={handleSubmit}>
                <Stack className='stack' spacing={2} >
                    <TextField
                        required
                        id="firstName"
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={firstNameError}
                        helperText={firstNameError ? 'First Name is required' : ''}
                    />
                    <TextField
                        required
                        id="lastName"
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={lastNameError}
                        helperText={lastNameError ? 'Last Name is required' : ''}
                    />
                    <TextField
                        required
                        id="email"
                        label="Email Address"
                        value={email}
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
                        helperText={emailError ? 'Username is required' : ''}
                    />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError || isEqualPasswordError}
                        helperText={
                            [
                                passwordError ? 'Password is required' : '',
                                isEqualPasswordError ? 'Password and Confirm Password are not equals' : ''
                            ]
                        }
                    />
                    <TextField
                        required
                        id="confirmPassword"
                        label="Confirm Password"
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={confirmPasswordError || isEqualPasswordError}
                        helperText={
                            [
                                confirmPasswordError ? 'Confirm Password is required' : '',
                                isEqualPasswordError ? 'Password and Confirm Password are not equals' : ''
                            ]
                        }
                    />
                    <TextField
                        required
                        id="contactNumberail"
                        label="Contact Number"
                        value={contactNumber}
                        type='number'
                        onChange={(e) => setContactNumber(e.target.value)}
                        error={contactNumberError}
                        helperText={contactNumberError ? 'Contact Number is required' : ''}
                    />
                    {error &&
                        <Alert variant="filled" severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error}
                        </Alert>
                    }
                    {success &&
                        <Alert variant="filled" severity="success">
                            <AlertTitle>Success</AlertTitle>
                            User registered successfully!
                        </Alert>
                    }
                    <Button variant="contained" type="submit">
                        Sign Up
                    </Button>
                    <Link to="/login" className='link'>
                        <Typography variant='body2'>
                            Already have an account? Sign In
                        </Typography>
                    </Link>
                </Stack>
            </form>
        </Container>
    );
}

export default SignUp;
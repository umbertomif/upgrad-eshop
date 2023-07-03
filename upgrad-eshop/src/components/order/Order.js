import './Order.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, TextField, Typography, Button, Box, Card, CardMedia, Stack, Grid, Stepper, Step, StepLabel, Alert, AlertTitle, Select, MenuItem } from '@mui/material';
import productService from '../../services/productService';
import addressService from '../../services/addressService';
import orderService from '../../services/orderService';

const Order = () => {
    // params
    const { id } = useParams();
    const { quantity } = useParams();
    // product
    const [product, setProduct] = useState(null);
    // Select Address
    const [addresses, setAddresses] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState('');
    // Steps
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Items', 'Select Address', 'Confirm Order'];
    // Address Form Fields
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(null);
    const [contactNumber, setContactNumber] = useState('');
    const [contactNumberError, setContactNumberError] = useState(null);
    const [street, setStreet] = useState('');
    const [streetError, setStreetError] = useState(null);
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState(null);
    const [state, setState] = useState('');
    const [stateError, setStateError] = useState(false);
    const [landmark, setLandmark] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [zipcodeError, setZipcodeError] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchProductDetails();
        fetchAddresses();
    }, []);

    const fetchProductDetails = async () => {
        try {
            const product = await productService.getProduct(id);
            setProduct(product);
        } catch (error) {
            console.error('Fetch Product Details Error:', error);
        }
    };

    const fetchAddresses = async () => {
        try {
            const addresses = await addressService.getAddresses();
            setAddresses(addresses);
        } catch (error) {
            console.error('Fetch Addresses Error:', error);
        }
    };

    const initialState = () => {
        setName('');
        setContactNumber('');
        setStreet('');
        setCity('');
        setState('');
        setLandmark('');
        setZipcode('');
        removeError();
    }

    const removeError = () => {
        setError(null);
        setSuccess(null);
        setNameError(null);
        setContactNumberError(null);
        setStreetError(null);
        setCityError(null);
        setStateError(null);
        setZipcode(null);
    }

    const validateForm = () => {
        if (name.trim() === '') {
            setNameError(true);
            return false;
        }
        if (contactNumber.trim() === '') {
            setContactNumberError(true);
            return false;
        }
        if (street.trim() === '') {
            setStreetError(true);
            return false;
        }
        if (city.trim() === '') {
            setCityError(true);
            return false;
        }
        if (state.trim() === '') {
            setStateError(true);
            return false;
        }
        if (zipcode.trim() === '') {
            setZipcodeError(true);
            return false;
        }
        return true
    };

    const handleBackButtonClick = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        if (activeStep === 0) {
            window.location.href = `/product-detail/${id}`;
        }
    };

    const handleNextButtonClick = () => {
        if (activeStep === 1 && selectedAddress === '') {
            setError('Please select address!');
            return;
        }
        setError(null);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const storedUser = JSON.parse(sessionStorage.getItem('user'));
            const user = storedUser.id;
            const data = {
                name,
                contactNumber,
                street,
                city,
                state,
                landmark,
                zipcode,
                user
            }
            try {
                const response = await addressService.addAddress(data);
                console.log('Added Address successful:', response);
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

    const handleConfirmOrder = async () => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        const user = storedUser.id;
        const data = {
            quantity,
            product: product.id,
            address: selectedAddress.id,
            user
        }
        try {
            const response = await orderService.addOrder(data);
            console.log('Order successful:', response);
            // Reset the form
            initialState();
            // Set Success
            setSuccess(true);
            // redirect to home
            window.location.href = '/';
        } catch (error) {
            console.error('Sign Up error:', error);
            setError(error.message);
        }
};

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Container sx={{ marginTop: 5 }}>
                <Stepper className="step" activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Container>
            {activeStep === 0 ? (
                <Container sx={{ marginTop: 5 }}>
                    <Stack direction="column" alignItems="center" justifyContent="center">
                        <Grid container alignItems="center" justifyContent="center" mt={10} columnSpacing={6}>
                            <Grid item>
                                <Card>
                                    <CardMedia component="img" width="300" height="300" image={product.imageUrl} alt={product.name} />
                                </Card>
                            </Grid>
                            <Grid item>
                                <Grid container direction="column" rowSpacing={2}>
                                    <Grid item>
                                        <Typography variant="h5">{product.name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="row">
                                            <Typography variant="body2" mr={2}>Quantity: </Typography>
                                            <Typography variant="body2" fontWeight="bold">{quantity}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="row">
                                            <Typography variant="body2" mr={2}>Category: </Typography>
                                            <Typography variant="body2" fontWeight="bold">{product.category}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1" fontStyle="italic">{product.description}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5" sx={{ color: "red" }} >Total Price: {product.price * quantity}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            ) : (<div></div>)}
            {activeStep === 1 ? (
                <Container sx={{ marginTop: 5 }}>
                    <Stack alignItems={"center"} justifyContent={"center"} spacing={4} mt={4}>
                        <Select className='select'
                            value={selectedAddress}
                            onChange={event => setSelectedAddress(event.target.value)}
                            displayEmpty
                            fullWidth
                        >
                            <MenuItem value="" disabled>
                                Select...
                            </MenuItem>
                            {addresses.map((address, index) => (
                                <MenuItem key={index} value={address}>
                                    {address.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Typography variant='body1'>
                            -OR-
                        </Typography>
                        <Typography variant='h5'>
                            Add Address
                        </Typography>
                    </Stack>
                    <form onSubmit={handleAddressSubmit}>
                        <Stack className='fields' spacing={2} >
                            <TextField
                                required
                                id="name"
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={nameError}
                                helperText={nameError ? 'Name is required' : ''}
                            />
                            <TextField
                                required
                                id="contactNumberail"
                                label="Contact Number"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                error={contactNumberError}
                                helperText={contactNumberError ? 'Contact Number is required' : ''}
                            />
                            <TextField
                                required
                                id="street"
                                label="Street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                error={streetError}
                                helperText={streetError ? 'Street is required' : ''}
                            />
                            <TextField
                                required
                                id="city"
                                label="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                error={cityError}
                                helperText={cityError ? 'City is required' : ''}
                            />
                            <TextField
                                required
                                id="state"
                                label="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                error={stateError}
                                helperText={stateError ? 'State is required' : ''}
                            />
                            <TextField
                                id="landmark"
                                label="Landmark"
                                value={landmark}
                                onChange={(e) => setLandmark(e.target.value)}
                            />
                            <TextField
                                required
                                id="zipcode"
                                label="Zip Code"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                                error={zipcodeError}
                                helperText={zipcodeError ? 'Zip Code is required' : ''}
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
                                    Address registered successfully!
                                </Alert>
                            }
                            <Button variant="contained" type="submit">
                                SAVE ADDRESS
                            </Button>
                        </Stack>
                    </form>
                </Container>
            ) : (<div></div>)}
            {activeStep === 2 ? (
                <Container>
                    <Box sx={{ display: 'flex', padding: 5 }} mt={10}>
                        <Grid container direction="column" alignItems="left" justifyContent="left" rowSpacing={2}>
                            <Grid item>
                                <Typography variant="h4">{product.name}</Typography>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row">
                                    <Typography variant="body2" mr={2}>Quantity: </Typography>
                                    <Typography variant="body2" fontWeight="bold">{quantity}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row">
                                    <Typography variant="body2" mr={2}>Category: </Typography>
                                    <Typography variant="body2" fontWeight="bold">{product.category}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" fontStyle="italic">{product.description}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" sx={{ color: "red" }} >Total Price: {product.price * quantity}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container className="line" direction="column" alignItems="left" justifyContent="left">
                            <Grid item>
                                <Typography variant="h4" marginBottom={2}>Address Details :</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">{selectedAddress.name}</Typography>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row">
                                    <Typography variant="body1" mr={1}>Contact Number: </Typography>
                                    <Typography variant="body1">{selectedAddress.contactNumber}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">{selectedAddress.city}, {selectedAddress.street}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">{selectedAddress.state}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">{selectedAddress.zipcode}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            ) : (<div></div>)}
            <Grid container alignItems="center" justifyContent="center" direction="row" columnSpacing={1} mt={4}>
                <Grid item>
                    <Button variant="text" sx={{ color: "gray" }} onClick={handleBackButtonClick}>
                        BACK
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={activeStep === steps.length - 1 ? handleConfirmOrder : handleNextButtonClick}>
                        {activeStep === steps.length - 1 ? 'PLACE ORDER' : 'NEXT'}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Order;

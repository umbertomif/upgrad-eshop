import './Product.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { Container, Stack, Typography, TextField, Button, Alert, AlertTitle } from '@mui/material';
import productService from '../../services/productService';

const Product = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('Add Product');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    // dropdown list
    const [categories, setCategories] = useState([]);
    // fields
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(null);
    const [category, setCategory] = useState('');
    const [categoryError, setCategoryError] = useState(null);
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturerError, setManufacturerError] = useState(null);
    const [availableItems, setAvailableItems] = useState('');
    const [availableItemsError, setAvailableItemsError] = useState(null);
    const [price, setPrice] = useState('');
    const [priceError, setPriceError] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrlError, setImageUrlError] = useState(null);
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(null);

    const fetchCategories = async () => {
        try {
            const items = await productService.getCategories();
            const options = items.map(item => ({ value: item, label: item }));
            setCategories(options);
        } catch (error) {
            console.error('Get Categories error:', error);
        }
    };

    const fetchProduct = async (id) => {
        try {
            const product = await productService.getProduct(id);
            console.log(product);
            setName(product.name);
            setCategory({ value: product.category, label: product.category });
            setManufacturer(product.manufacturer);
            setAvailableItems(product.availableItems);
            setPrice(product.price);
            setImageUrl(product.imageUrl);
            setDescription(product.description);
        } catch (error) {
            console.error('Get Categories error:', error);
        }
    };

    const addProduct = async (data) => {
        try {
            const response = await productService.addProduct(data);
            console.log('Added Product successfully:', response);
            // Reset the form
            initialState();
            // Set Success
            setSuccess(true);
        } catch (error) {
            console.error('Added Product error:', error);
            setError(error.message);
        }
    }

    const updateProduct = async (id, data) => {
        try {
            const response = await productService.updateProduct(id, data);
            console.log('Updated Product successfully:', response);
            // Set Success
            setSuccess(true);

        } catch (error) {
            console.error('Updated Product error:', error);
            setError(error.message);

        }
    }

    const initialState = () => {
        setName('');
        setCategory('');
        setManufacturer('');
        setAvailableItems('');
        setPrice('');
        setImageUrl('');
        setDescription('');
        removeError();
    }

    const removeError = () => {
        setError(null);
        setSuccess(null);
        setNameError(null);
        setCategoryError(null);
        setManufacturerError(null);
        setAvailableItemsError(null);
        setPriceError(null);
        setImageUrlError(null);
        setDescriptionError(null);
    }

    const validateForm = () => {
        if (name === '') {
            setNameError(true);
            return false;
        }
        if (category.value === '') {
            setCategoryError(true);
            return false;
        }
        if (manufacturer === '') {
            setManufacturerError(true);
            return false;
        }
        if (availableItems <= 0) {
            setAvailableItemsError(true);
            return false;
        }
        if (price <= 0) {
            setPriceError(true);
            return false;
        }
        if (imageUrl === '') {
            setImageUrlError(true);
            return false;
        }
        if (description === '') {
            setDescriptionError(true);
            return false;
        }
        return true
    };

    useEffect(() => {
        fetchCategories();
        if (id) {
            fetchProduct(id);
            setTitle('Modify Product')
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        removeError();
        const data = {
            name,
            category: category.value,
            price,
            manufacturer,
            availableItems,
            imageUrl,
            description,
        }
        if (id) {
            updateProduct(id, data);
        } else {
            addProduct(data);
        }
    };

    return (
        <Container className="container">
            <Stack sx={{ alignItems: "center" }} spacing={2}>
                <Typography variant='h5'>
                    {title}
                </Typography>
            </Stack>
            <form onSubmit={handleSubmit}>
                <Stack className='stack' spacing={2} >
                    <TextField
                        required
                        id="name"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={nameError}
                        helperText={nameError ? 'Name is required' : ''}
                    />
                    <CreatableSelect
                        required
                        defaultOptions
                        options={categories}
                        cacheOptions
                        value={category}
                        onChange={category => setCategory(category)}
                        error={categoryError}
                        helperText={categoryError ? 'Category is required' : ''}
                    />
                    <TextField
                        required
                        id="manufacturer"
                        label="Manufacturer"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        error={manufacturerError}
                        helperText={manufacturerError ? 'Manufacturer is required' : ''}
                    />
                    <TextField
                        required
                        id="availableItems"
                        label="Available Items"
                        type='number'
                        value={availableItems}
                        onChange={(e) => setAvailableItems(e.target.value)}
                        error={availableItemsError}
                        helperText={availableItemsError ? 'Available Items is required' : ''}
                    />
                    <TextField
                        required
                        id="price"
                        label="Price"
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        error={priceError}
                        helperText={priceError ? 'Price is required' : ''}
                    />
                    <TextField
                        required
                        id="imageUrl"
                        label="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        error={imageUrlError}
                        helperText={imageUrlError ? 'Image URL is required' : ''}
                    />
                    <TextField
                        required
                        id="description"
                        label="Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        error={descriptionError}
                        helperText={descriptionError ? 'Product Description is required' : ''}
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
                        SAVE PRODUCT
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}

export default Product;
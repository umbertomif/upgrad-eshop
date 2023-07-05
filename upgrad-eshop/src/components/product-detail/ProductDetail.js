import './ProductDetail.css';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Card, CardMedia, Stack, ToggleButton, ToggleButtonGroup, Grid } from '@mui/material';
import productService from '../../services/productService';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const prevCategories = useRef(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (prevCategories.current && JSON.stringify(prevCategories.current) !== JSON.stringify(categories)) {
            fetchCategories();
        }
        prevCategories.current = categories
    }, [categories]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const product = await productService.getProduct(id);
                setProduct(product);
            } catch (error) {
                console.error('Fetch Product Details Error:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const fetchCategories = async () => {
        try {
            const items = await productService.getCategories();
            const options = items.map((item) => ({ value: item, label: item }));
            options.unshift({ value: '', label: 'ALL' });
            setCategories(options);
        } catch (error) {
            console.error('Get Categories error:', error);
        }
    };

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleBuyButtonClick = () => {
        window.location.href = `/order/${id}/${quantity}`;
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Stack direction="column" alignItems="center" mt={4}>
                <ToggleButtonGroup
                    value={selectedCategory}
                    exclusive
                    onChange={handleCategoryChange}
                >
                    {categories.map((category) => (
                        <ToggleButton key={category.value} value={category.value} aria-label={category.label}>
                            {category.label}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
                <Grid container alignItems="center" justifyContent="center" mt={10} columnSpacing={4}>
                    <Grid item>
                        <Card>
                            <CardMedia component="img" width="300" height="300" image={product.imageUrl} alt={product.name} />
                        </Card>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" rowSpacing={4}>
                            <Grid item>
                                <Grid container direction="row" columnSpacing={2}>
                                    <Grid item>
                                        <Typography variant="h5">{product.name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1">Available Quantity: {product.availableItems}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row" columnSpacing={2}>
                                    <Grid item>
                                        <Typography variant="body2">Category: </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" fontWeight="bold">{product.category}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" fontStyle="italic">{product.description}</Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    required
                                    type="number"
                                    label="Enter Quantity"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={handleBuyButtonClick}>
                                    PLACE ORDER
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
};

export default ProductDetail;

import './Products.css';
import React, { useState, useEffect } from 'react';
import { Container, Stack, Typography, ToggleButton, ToggleButtonGroup, Select, MenuItem, Card, CardContent, Grid } from '@mui/material';
import productService from '../../services/productService';

const Products = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState('default');

    const fetchCategories = async () => {
        try {
            const items = await productService.getCategories();
            const options = items.map((item) => ({ value: item, label: item }));
            setCategories(options);
        } catch (error) {
            console.error('Get Categories error:', error);
        }
    };

    const fetchProducts = async (sortOption) => {
        try {
            const items = await productService.getProducts(sortOption);
            setProducts(items);
        } catch (error) {
            console.error('Get Products error:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts(selectedSortOption);
    }, []);

    const handleCategoryChange = (event, newCategory) => {
        setSelectedCategory(newCategory);
    };

    const handleSortOptionChange = (event) => {
        const sortOption = event.target.value;
        setSelectedSortOption(sortOption);
        fetchProducts(sortOption);
    };

    return (
        <Container>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mt={2}>
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
            </Stack>
            <Stack direction="row" spacing={2} alignItems="left" justifyContent="flex-start" mt={2}>
                <Select className="select-sort" value={selectedSortOption} onChange={handleSortOptionChange}>
                    <MenuItem value="default">Default</MenuItem>
                    <MenuItem value="priceHighToLow">Price High to Low</MenuItem>
                    <MenuItem value="priceLowToHigh">Price Low to High</MenuItem>
                    <MenuItem value="newest">Newest</MenuItem>
                </Select>
            </Stack>
            <Grid container spacing={2} mt={2}>
                {products.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', marginTop: '10px' }} />
                                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                                    <Typography variant="h5" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        {product.price}
                                    </Typography>
                                </Stack>
                                <Typography variant="body2">
                                    {product.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Products;

import './Home.css';
import React, { useState, useEffect, useRef } from 'react';
import {
    Container,
    Stack,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Select,
    MenuItem,
    Card,
    CardContent,
    Grid,
    Button,
    IconButton,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert, 
    Snackbar
} from '@mui/material';
import productService from '../../services/productService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
    const [user, setUser] = useState(null);
    const prevUser = useRef(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState('default');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const getUser = () => {
        // Retrieve user data from session storage
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    };

    const isAdmin = () => {
        if (user) {
            return user.roles.includes('ADMIN');
        }
        return false;
    };

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

    const fetchProducts = async () => {
        try {
            const items = await productService.getProducts();
            setProducts(items);
        } catch (error) {
            console.error('Get Products error:', error);
        }
    };

    const deleteProduct = async (product) => {
        try {
            const isDeleted = await productService.deleteProduct(product.id);
            if (isDeleted) {
                setProducts((prevProducts) =>
                    prevProducts.filter((item) => item.id !== product.id)
                );
                setSuccess(`Product ${product.name} deleted successfully`);
            }
        } catch (error) {
            console.error('Delete Product error:', error);
        }
    };

    useEffect(() => {
        getUser();
        fetchCategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        // Check if user role has changed
        if (prevUser.current && prevUser.current.roles !== user?.roles) {
            getUser();
        }
        prevUser.current = user;
    }, [user]);

    useEffect(() => {
        if (selectedCategory) {
            const filteredProducts = products.filter(
                (product) => product.category === selectedCategory
            );
            setFilteredProducts(filteredProducts);
        } else {
            setFilteredProducts(products);
        }
    }, [selectedCategory, products]);

    useEffect(() => {
        sortProducts(selectedSortOption);
    }, [selectedSortOption]);

    const handleCategoryChange = (event, category) => {
        setSelectedCategory(category);
    };

    const handleSortOptionChange = (event) => {
        const sortOption = event.target.value;
        setSelectedSortOption(sortOption);
    };

    const sortProducts = (sortOption) => {
        let sortedProducts = [...filteredProducts];
        switch (sortOption) {
            case 'priceHighToLow':
                sortedProducts.sort((product1, product2) =>
                    product2.price - product1.price
                );
                break;
            case 'priceLowToHigh':
                sortedProducts.sort((product1, product2) =>
                    product1.price - product2.price
                );
                break;
            case 'newest':
                sortedProducts.sort(
                    (product1, product2) =>
                        new Date(product2.createdAt) - new Date(product1.createdAt)
                );
                break;
            default:
                break;
        }
        setFilteredProducts(sortedProducts);
    };

    const handleBuyClick = (productId) => {
        window.location.href = `/product-detail/${productId}`;
    };

    const handleEditClick = (productId) => {
        window.location.href = `/product/${productId}`;
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDialogConfirm = () => {
        console.log('Delete confirmed');
        deleteProduct(selectedProduct);
        setOpenDialog(false);
    };

    const handleCloseSnackbar = () => {
        setError(null);
        setSuccess(null);
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
                {filteredProducts.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', marginTop: '10px' }} />
                                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                                    <Typography variant="h6" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="h6">
                                        {product.price}
                                    </Typography>
                                </Stack>
                                <Typography variant="body2">
                                    {product.description}
                                </Typography>
                                <Box display="flex" alignItems="center" marginTop={2}>
                                    <Button variant="contained" onClick={() => handleBuyClick(product.id)}>
                                        BUY
                                    </Button>
                                    {isAdmin() && user !== null && (
                                        <Box marginLeft="auto">
                                            <IconButton onClick={() => handleEditClick(product.id)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteClick(product)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
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
            {success &&
                <Snackbar
                    open={!!success}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert variant="filled" severity="success">
                        {success}
                    </Alert>
                </Snackbar>
            }
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Confirm deletion of product?</DialogTitle>
                <DialogContent>
                    <Typography variant="body2">Are you sure you want to delete this product?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogConfirm} variant="contained" color="primary">OK</Button>
                    <Button onClick={handleDialogClose} variant="outlined">CANCEL</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Home;

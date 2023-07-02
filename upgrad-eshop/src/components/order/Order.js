import './Order.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Card, CardMedia, Stack, Grid } from '@mui/material';
import productService from '../../services/productService';

const Order = () => {
    const { id } = useParams();
    const { quantity } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = async () => {
        try {
            const product = await productService.getProduct(id);
            setProduct(product);
        } catch (error) {
            console.error('Fetch Product Details Error:', error);
        }
    };

    const handleBackButtonClick = () => {
        window.location.href = `/product-detail/${id}`;
    };

    const handleNextButtonClick = () => {
        console.log(`Buy Product ${id} with Quantity: ${quantity}`);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Stack direction="column" alignItems="center" justifyContent="center" mt={4}>

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
                            <Grid item>
                                <Grid container direction="row" columnSpacing={1} mt={10}>
                                    <Grid item>
                                        <Button variant="text" sx={{color: "gray"}} onClick={handleBackButtonClick}>
                                            BACK
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" onClick={handleNextButtonClick}>
                                            NEXT
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
};

export default Order;

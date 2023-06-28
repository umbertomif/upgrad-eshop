const url = 'http://localhost:8080/api/products/';

const productService = {


    getCategories: async () => {
        const getCategoriesUrl = url + 'categories';
        try {
            const response = await fetch(getCategoriesUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Get failed. Please try again.');
            }
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            throw new Error('Get failed. Please try again.');
        }
    },

    getProducts: async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Get failed. Please try again.');
            }
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            throw new Error('Get failed. Please try again.');
        }
    },

    getProduct: async (id) => {
        const getProductUrl =  url + id;
        try {
            const response = await fetch(getProductUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Get failed. Please try again.');
            }
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            throw new Error('Get failed. Please try again.');
        }
    },

    addProduct: async (data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Add failed. Please try again.');
            }
            return response.ok;
        } catch (error) {
            throw new Error('Add failed. Please try again.');
        }
    },

    updateProduct: async (id, data) => {
        const updateProductUrl = url + id;
        try {
            const response = await fetch(updateProductUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Update failed. Please try again.');
            }
            return response.ok;
        } catch (error) {
            throw new Error('Update failed. Please try again.');
        }
    },

    deleteProduct: async (id) => {
        const deleteProductUrl = url + id;
        try {
            const response = await fetch(deleteProductUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Delete failed. Please try again.');
            }
            return response.ok;
        } catch (error) {
            throw new Error('Delete failed. Please try again.');
        }
    },
}

export default productService;
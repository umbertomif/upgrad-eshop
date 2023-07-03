const url = 'http://localhost:8080/api/orders/';

const orderService = {

    addOrder: async (data) => {
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

}

export default orderService;
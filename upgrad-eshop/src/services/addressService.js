const url = 'http://localhost:8080/api/addresses/';

const addressService = {

    getAddresses: async () => {
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

    addAddress: async (data) => {
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

export default addressService;
const authService = {

    loginService: async (username, password) => {
        const loginUrl = 'http://localhost:8080/api/auth/signin';
        const data = {
            username,
            password,
        };
        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Login failed. Please try again.');
            }
            const responseData = await response.json();
            if (responseData) {
                return responseData;
            } else {
                throw new Error('Login failed. Please try again.');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    signUpService: async (email, password, firstName, lastName, contactNumber) => {
        const signUpUrl = 'http://localhost:8080/api/auth/signup';
        const data = {
            email,
            password,
            firstName,
            lastName,
            contactNumber,
        };
        try {
            const response = await fetch(signUpUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('SignUp failed. Please try again.');
            }
            return response.ok;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default authService;
const url = 'http://localhost:8080/api/auth/signin';

const loginService = async (username, password) => {
    const loginUrl = url + '';
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
        return responseData;
    } catch (error) {
        throw new Error('Login failed. Please try again.');
    }
};

const signUpService = async (email, password, firstName, lastName, contactNumber) => {
    const signUpUrl = url + 'signup';
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
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw new Error('SignUp failed. Please try again.');
    }
};

export default { signUpService, loginService };

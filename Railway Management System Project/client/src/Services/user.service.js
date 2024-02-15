import httpClient from '../http-common';

const register = (data) => {
    return httpClient.post('/user/register', data);
};

const login = (data) => {
    return httpClient.post('/user/login', data);
};

const generateOTP = (email) => {
    return httpClient.get(`/user/generateOTP?email=${email}`);
};

export default { register, login, generateOTP }
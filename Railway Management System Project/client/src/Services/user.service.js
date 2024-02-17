import httpClient from '../http-common';

const register = (otp,data) => {
    return httpClient.post(`/user/register?otp=${otp}`, data);
};

const login = (data) => {
    return httpClient.post('/user/login', data);
};

const generateOTP = (email) => {
    return httpClient.get(`/user/generateOTP?email=${email}`);
};

export default { register, login, generateOTP }
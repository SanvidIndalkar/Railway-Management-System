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

const forgotPassword = (email) => {
    return httpClient.post('/user/forgot-password?email=' + email);
}

const resetPassword = (data) => {
    return httpClient.post('/user/reset-password', data);
}

export default { register, login, generateOTP, forgotPassword, resetPassword }
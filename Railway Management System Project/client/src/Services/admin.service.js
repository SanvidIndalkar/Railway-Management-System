import httpClient from '../http-common';

const login = (data) => {
    return httpClient.post('/admin/login', data);
};

export default { login }

import httpClient from '../http-common';

const getAllStations = () => {
    return httpClient.get('/stations/all');
};

export default { getAllStations }

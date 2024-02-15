import httpClient from '../http-common';

const rescheduleTrain = (data) => {
    return httpClient.put('/trains//reschedule', data);
};

const findTrainBySourceDestinationDate = (data) => {
    return httpClient.post('/trains/searchTrain', data);
};

const findTrainsByTwoStopsInSequence = (data) => {
    return httpClient.post('/trains/searchTrain/startAndStop', data);
};

const addTrain = (data) => {
    return httpClient.post('/trains/add', data);
};

const findTrainAllDetails = (trainId) => {
    return httpClient.get(`/trains/searchTrainAllDetails/${trainId}`);
};

const findTrainByNumber = (trainNumber) => {
    return httpClient.get(`/trains/number/${trainNumber}`);
};

const findTrainByName = (trainName) => {
    return httpClient.get(`/trains/name/${trainName}`);
};

const findTrainDetailsById = (trainId) => {
    return httpClient.get(`/trains/findTrainById/${trainId}`);
};

const getAllTrains = () => {
    return httpClient.get('/trains/allTrains');
};

const getAllTrainsByAdmin = (adminId) => {
    return httpClient.get(`/trains/admin/allTrain/${adminId}`);
};

export default { rescheduleTrain, findTrainBySourceDestinationDate, findTrainsByTwoStopsInSequence, addTrain, findTrainAllDetails, findTrainByNumber, findTrainByName, findTrainDetailsById, getAllTrains, getAllTrainsByAdmin };

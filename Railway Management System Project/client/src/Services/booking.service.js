import httpClient from '../http-common';

const bookTrainWithPassengers = (trainId, data) => {
    return httpClient.post(`/booking/passengers/${trainId}`,data);
};

const bookingDetailsOfTrain = (trainId) => {
    return httpClient.get(`/booking/booking/${trainId}`);
};

const passengerDetailsOfPNR = (pnr) => {
    return httpClient.get(`/booking/booking/${pnr}`);
};

export default { bookTrainWithPassengers, bookingDetailsOfTrain, passengerDetailsOfPNR }
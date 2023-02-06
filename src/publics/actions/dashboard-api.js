import * as axiosRT from 'axios';
import axiosRetry from 'axios-retry';

const myAxiosRtInstance = axiosRT.create({
	baseURL: process.env.REACT_APP_API
});

axiosRetry(myAxiosRtInstance, { retries: 3, shouldResetTimeout: true, retryCondition: () => true });

export const dashboardApi = async (token) => {
    return await myAxiosRtInstance.get(`dashboard`,{ headers: { auth: token }})
};

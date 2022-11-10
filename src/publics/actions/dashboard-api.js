import api from '../../axios/Api';

export const dashboardApi = async (token) => {
    return await api.get(`dashboard`,{ headers: { auth: token } })
};

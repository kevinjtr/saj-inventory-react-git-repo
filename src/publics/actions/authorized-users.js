import api from '../../axios/Api';
import { AUTHORIZED_USERS } from '../../components/config/constants'
/* 
export const updateProblemReportApi = (rowData, token) => {
    return api.post(`${AUTHORIZED_USERS}/update`,{params:rowData},{headers:{auth:token}})
}; */

export const deleteAuthorizedUsersApi = async (rowData, token) => {
    return await api.post(`${AUTHORIZED_USERS}/delete`, { params: rowData }, { headers: { auth: token } })
};

export const addAuthorizedUsersApi = (rowData, token) => {// no token needed.
    return api.post(`${AUTHORIZED_USERS}/add`, { params: rowData }, { headers: { auth: token } })
};

export const getAuthorizedUsersApi = (token) => {
    return api.get(AUTHORIZED_USERS, { headers: { auth: token } })
};

export const getNamesApi = (token) => {
    return api.get(`${AUTHORIZED_USERS}/getNames`, { headers: { auth: token } })
};

export const getHRAsApi = (token) => {
    return api.get(`${AUTHORIZED_USERS}/getHRAs`, { headers: { auth: token } })
};
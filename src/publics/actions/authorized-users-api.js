import api from '../../axios/Api';
import {AUTHORIZED_USERS} from '../../components/config/constants'
/* 
export const updateProblemReportApi = (rowData, token) => {
	return api.post(`${AUTHORIZED_USERS}/update`,{params:rowData},{headers:{auth:token}})
}; */

// export const destroyEmployeeApi = async (rowData, token) => {
// 	return await api.post(`${PROBLEM_REPORT}/destroy`,{params:rowData},{headers:{auth:token}})
// };

// export const addAuthorizedUsersApi = (rowData) => {// no token needed.
// 	return api.post(`${AUTHORIZED_USERS}/add`,{params:rowData})
// };

export const getAuthorizedUsersApi = (token) => {
	return api.get(AUTHORIZED_USERS,{headers:{auth:token}})
};

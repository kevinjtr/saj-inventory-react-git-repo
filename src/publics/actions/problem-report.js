import api from '../../axios/Api';
import {PROBLEM} from '../../components/config/constants'

export const updateProblemReportApi = (rowData, token) => {
	return api.post(`${PROBLEM}/update`,{params:rowData},{headers:{auth:token}})
};

// export const destroyEmployeeApi = async (rowData, token) => {
// 	return await api.post(`${PROBLEM_REPORT}/destroy`,{params:rowData},{headers:{auth:token}})
// };

export const addProblemReportApi = (rowData) => {// no token needed.
	return api.post(`${PROBLEM}/add`,{params:rowData})
};

export const getAllProblemReportsApi = (token) => {
	return api.get(PROBLEM,{headers:{auth:token}})
};
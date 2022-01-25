import api from '../../axios/Api';
import {EMPLOYEE} from '../../components/config/constants'

export const updateEmployeeApi = async (rowData, token) => {
	return await api.post(`${EMPLOYEE}/update`,{params:rowData},{headers:{auth:token}})
};

export const destroyEmployeeApi = async (rowData, token) => {
	return await api.post(`${EMPLOYEE}/destroy`,{params:rowData},{headers:{auth:token}})
};

export const addEmployeeApi = async (rowData, token) => {
	return await api.post(`${EMPLOYEE}/add`,{params:rowData},{headers:{auth:token}})
};

export const getAllEmployeesApi = async (token) => {
	return await api.get(EMPLOYEE,{headers:{auth:token}})
};
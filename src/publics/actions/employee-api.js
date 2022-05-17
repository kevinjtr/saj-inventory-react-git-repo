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

export const getAllEmployees2Api = async (token) => {
	return await api.get(`${EMPLOYEE}2`,{headers:{auth:token}})
};

export const addEmployee2Api = async (rowData, token) => {
	return await api.post(`${EMPLOYEE}2/add`,{params:rowData},{headers:{auth:token}})
};

export const getEmployeeByEDIPIWithOffice = async (token) => {
	return await api.get(`${EMPLOYEE}2/getByEDIPIWithOffice`,{headers:{auth:token}})
};


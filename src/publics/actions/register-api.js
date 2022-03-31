import api from '../../axios/Api';
import {REGISTER} from '../../components/config/constants'

// export const updateEquipmentApi = async (rowData, token) => {
// 	return api.post(`${REGISTER}/update`,{params:rowData},{headers:{auth:token}})
// };

// export const destroyEquipmentApi = async (rowData, token) => {
// 	return api.post(`${REGISTER}/destroy`,{params:rowData},{headers:{auth:token}})
// };

export const registerUserApi = async (values) => {
	return api.post(`${REGISTER}/add`,{params: {newData: values}})
};

// export const getAllEquipmentsApi = async (token) => {
// 	return api.get(REGISTER,{headers:{auth:token}})
// };

// export const equipmentSearchApi = async (searchParams, token) => {
// 	return api.post(`${REGISTER}/search`,searchParams,{headers:{auth:token}})
// };
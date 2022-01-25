import api from '../../axios/Api';
import {EQUIPMENT} from '../../components/config/constants'

export const updateEquipmentApi = async (rowData, token) => {
	return api.post(`${EQUIPMENT}/update`,{params:rowData},{headers:{auth:token}})
};

export const destroyEquipmentApi = async (rowData, token) => {
	return api.post(`${EQUIPMENT}/destroy`,{params:rowData},{headers:{auth:token}})
};

export const addEquipmentApi = async (rowData, token) => {
	return api.post(`${EQUIPMENT}/add`,{params:rowData},{headers:{auth:token}})
};

export const getAllEquipmentsApi = async (token) => {
	return api.get(EQUIPMENT,{headers:{auth:token}})
};

export const equipmentSearchApi = async (searchParams, token) => {
	return api.post(`${EQUIPMENT}/search`,searchParams,{headers:{auth:token}})
};
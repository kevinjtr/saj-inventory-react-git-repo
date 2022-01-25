import api from '../../axios/Api';
import {ANNUAL_INVENTORY} from '../../components/config/constants'

export const updateAnnualInventoryApi = async (rowData, token) => {
	return api.post(`${ANNUAL_INVENTORY}/update`,{params:rowData},{headers:{auth:token}})
};

export const destroyAnnualInventoryApi = async (rowData, token) => {
	return api.post(`${ANNUAL_INVENTORY}/destroy`,{params:rowData},{headers:{auth:token}})
};

export const addAnnualInventoryApi = async (rowData, token) => {
	return api.post(`${ANNUAL_INVENTORY}/add`,{params:rowData},{headers:{auth:token}})
};

export const getAllAnnualInventorysApi = async (token) => {
	return api.get(ANNUAL_INVENTORY,{headers:{auth:token}})
};

export const getAnnualInventoryByIdApi = async (id, token) => {
	return api.get(`${ANNUAL_INVENTORY}/${id}`,{headers:{auth:token}})
};

export const annualInventorySearchApi = async (searchParams, token) => {
	return api.post(`${ANNUAL_INVENTORY}/search`,searchParams,{headers:{auth:token}})
};
import api from '../../axios/Api';
import {CHANGE_HISTORY, EMPLOYEE, ENG4900, HRA, EQUIPMENT} from '../../components/config/constants'
import {updateEmployeeApi} from './employee-api'
import {updateEquipmentApi} from './equipment-api'
import {updateHraApi} from './hra-api'

export const updateChangeHistoryByViewApi = {
    [EMPLOYEE]: updateEmployeeApi,
    [HRA]: updateHraApi,
    [EQUIPMENT]: updateEquipmentApi,
}

// export const destroyAnnualInventoryApi = async (rowData, token) => {
// 	return api.post(`${CHANGE_HISTORY}/destroy`,{params:rowData},{headers:{auth:token}})
// };

// export const addAnnualInventoryApi = async (rowData, token) => {
// 	return api.post(`${CHANGE_HISTORY}/add`,{params:rowData},{headers:{auth:token}})
// };

// export const getAllAnnualInventorysApi = async (token) => {
// 	return api.get(CHANGE_HISTORY,{headers:{auth:token}})
// };

export const getChangeHistoryByViewApi = async (view, token) => {
	return api.get(`${CHANGE_HISTORY}/${view}`,{headers:{auth:token}})
};

// export const annualInventorySearchApi = async (searchParams, token) => {
// 	return api.post(`${CHANGE_HISTORY}/search`,searchParams,{headers:{auth:token}})
// };
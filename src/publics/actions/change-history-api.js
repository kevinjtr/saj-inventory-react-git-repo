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

export const getChangeHistoryByViewApi = async (obj, token) => {
	return api.post(`${CHANGE_HISTORY}`,{tab:obj.tab,init:obj.init},{headers:{auth:token}})
};

export const getChangeHistoryByTableApi = async (id, table_name, token) => {
    return api.get(`${CHANGE_HISTORY}/${table_name}/${id}`,{},{headers:{auth:token}})
};
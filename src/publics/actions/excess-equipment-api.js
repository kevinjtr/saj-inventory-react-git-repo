import api from '../../axios/Api';
import {EXCESS_EQUIPMENT} from '../../components/config/constants'

export const getAllEquipmentsApi = async (token) => {
	return api.get(EXCESS_EQUIPMENT,{headers:{auth:token}})
};
import api from '../../axios/Api';
import {UPDATES_MAINTENANCE_MESSAGES} from '../../components/config/constants'


export const getAllMessagesApi = () => {
	return api.get(UPDATES_MAINTENANCE_MESSAGES)
};

/* export const getAllMessagesApi = (token) => {
	return api.get(UPDATES_MAINTENANCE_MESSAGES,{headers:{auth:token}})
}; */
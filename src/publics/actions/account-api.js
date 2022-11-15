import api from '../../axios/Api';

export const updateAccountApi = async (rowData, token) => {
	return await api.post(`account/update`,{params:rowData},{headers:{auth:token}})
};

export const getAccount = async (token) => {
	return await api.get(`account`,{headers:{auth:token}})
};

import api from '../../axios/Api';

export const addRegisteredUserApi = async (rowData, token) => {
	return api.post(`registered-users/add`,{params:rowData},{headers:{auth:token}})
};

export const getRegisteredUserByEDIPIApi = async (edipi, token) => {
	return api.get(`registered-users/getByEDIPI/${edipi}`,{headers:{auth:token}})
};

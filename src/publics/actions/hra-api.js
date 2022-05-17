import api from '../../axios/Api';
import {HRA} from '../../components/config/constants'

export const updateHraApi = async (rowData, token) => {
	return api.post(`${HRA}/update`,{params:rowData},{headers:{auth:token}})
};

export const destroyHraApi = async (rowData, token) => {
	return api.post(`${HRA}/destroy`,{params:rowData},{headers:{auth:token}})
};

export const addHraApi = async (rowData, token) => {
	return api.post(`${HRA}/add`,{params:rowData},{headers:{auth:token}})
};

export const getAllHrasApi = async (token) => {
	return api.get(`${HRA}2`,{headers:{auth:token}})
};

export const getHraFormApi = async (token) => {
	return api.get(`${HRA}/form`,{headers:{auth:token}})
};

export const hraSearchApi = async (searchParams, token) => {
	return api.post(`${HRA}/search`,searchParams,{headers:{auth:token}})
};
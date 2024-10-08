import api from '../../axios/Api';
import {ENG4900} from '../../components/config/constants'
import * as axiosRT from 'axios';
import axiosRetry from 'axios-retry';

const myAxiosRtInstance = axiosRT.create({
	baseURL: process.env.REACT_APP_API
});

axiosRetry(myAxiosRtInstance, { retries: 3, shouldResetTimeout: true, retryCondition: () => true });


export const updateEng4900Api = async (rowData, token) => {
	return api.post(`${ENG4900}/update`,{params:rowData},{headers:{auth:token}})
};

export const destroyEng4900Api = async (rowData, token) => {
	return api.post(`${ENG4900}/destroy`,{params:rowData},{headers:{auth:token}})
};

export const addEng4900Api = async (paramsObj, token) => {
	return api.post(`${ENG4900}/add`,paramsObj,{headers:{auth:token}})
};

export const getAllEng4900sApi = async (token) => {
	return api.get(ENG4900,{headers:{auth:token}})
};

export const getEng4900PdfByIdApi = async (id, token) => {
	return api.get(`${ENG4900}/pdf/${id}`,{headers:{auth:token},responseType: 'blob'})
};

export const getEng4900ByIdApi = async (id, token) => {

	return api.get(`${ENG4900}/${id}`,{headers:{auth:token}})
};

export const eng4900SearchApi = async (searchParams, token) => {
	return myAxiosRtInstance.post(`${ENG4900}/search2`,searchParams,{headers:{auth:token}})
};

//in progress
export const eng4900UploadApi = async (searchParams, token) => {
	return api.post(`${ENG4900}/upload`,searchParams,{headers:{auth:token}})
};

export const signEng4900Api = async (rowData, token) => {
	return api.post(`${ENG4900}/sign`,{params:rowData},{headers:{auth:token}})
};


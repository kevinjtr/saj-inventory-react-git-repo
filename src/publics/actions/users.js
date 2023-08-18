import Axios from 'axios';

export const login = (data) => {
	return {
		type: 'LOGIN',
		payload: Axios.post('/login', data)
	};
};

export const register = (data) => {
	return {
		type: 'REGISTER',
		payload: Axios.post('/register', data)
	};
};
// export const getProfile = () => {
//     return{
//         type: 'GET_PROFILE',
//         payload: Axios.get('http://localhost:4000/users/profile', {
//             headers:{
//                 auth: window.window.localStorage.getItem("token")
//             }
//         })
//     }
// }

import axios from 'axios';

console.log('.env variable:',process.env.REACT_APP_API)
export default axios.create({
	baseURL: 'https://localhost:8080'//process.env.REACT_APP_API
});

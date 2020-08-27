import axios from 'axios'
const APICONFIG = require('./config')

const axiosService = axios.create({
  baseURL: APICONFIG.HOST,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosService;




//getGithubListAPI
export const getGithubListAPI = (params) => 
axios.get(`https://api.github.com/users/${params}/repos`, {
  headers: {
    'Accept': 'application/json'
  }
}).then(response => {
   return response.data
})
  .catch(err => {
    throw err;
  });

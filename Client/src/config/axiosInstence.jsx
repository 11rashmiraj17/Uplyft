 import axios from 'axios'

const baseURL=import.meta.env.VITE_API_BASE_URL
console.log(baseURL)

 export const api= axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials:true
  
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // get token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // add auth header
    }
    return config;
  },
  (error) => Promise.reject(error)
);


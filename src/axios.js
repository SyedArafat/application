import axios from 'axios';

axios.defaults.baseURL = "http://localhost/products-api/public/api/";
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
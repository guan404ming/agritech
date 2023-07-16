import axios from 'axios';

const API_ROOT = 'https://data.coa.gov.tw/api/v1/';

const instance = axios.create({
    baseURL: API_ROOT,
    timeout: 60000,
});

export default instance;

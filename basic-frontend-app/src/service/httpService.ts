import axios from "axios";
//const config = require('../config.json');

//axios.defaults.baseURL = config.server.apiUrl;
axios.defaults.baseURL = process.env.REACT_APP_URL + '/api';

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    all: axios.all,
    spread: axios.spread
}

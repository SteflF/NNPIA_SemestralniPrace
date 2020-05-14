import axios from "axios";
const config = require('../config.json');

axios.defaults.baseURL = config.server.apiUrl;

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    all: axios.all,
    spread: axios.spread
}

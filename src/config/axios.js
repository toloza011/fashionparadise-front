import axios from "axios";

const client = axios.create({
    baseURL: process.env.REACT_APP_URL_BASE,
});

export default client
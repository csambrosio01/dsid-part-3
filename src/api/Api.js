import axios from "axios";

export default axios.create({
    baseURL: "https://api-pousar.herokuapp.com",
    responseType: "json",
    withCredentials: true
});

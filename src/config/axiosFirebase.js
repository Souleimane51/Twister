import axios from "axios";

const instance = axios.create({
    baseURL: "https://twister-849fa-default-rtdb.europe-west1.firebasedatabase.app/"
});

export default instance;
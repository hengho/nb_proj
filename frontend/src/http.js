import axios from "axios";

export default axios.create({
    baseURL: "http://ssal.sparcs.org:38080",
    headers: {
        "Content-type": "application/json"
    }
});
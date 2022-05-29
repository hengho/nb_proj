import http from "../http";

const getAll = () => {
    return  http.get("/users");
};

const get = userId => {
    return http.get(`/users/${userId}`);
};

const create = user => {
    return http.post("/users", user);
};

export default {
    getAll,
    get,
    create
}
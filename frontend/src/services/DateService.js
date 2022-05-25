import http from "../http";

const getAll = () => {
    return http.get("/dates");
};

const get = dateId => {
    return http.get(`/dates/${dateId}`);
};

const create = date => {
    return http.post("/dates", date);
};

const update = (id, date) => {
    return http.put(`/dates/${id}`, date);
};

const remove = id => {
    return http.delete(`/dates/${id}`);
}

export default {
    getAll,
    get,
    create,
    update,
    remove
}
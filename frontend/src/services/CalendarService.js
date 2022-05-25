import http from "../http";

const getAll = () => {
    return http.get("/calendars");
};

const get = dateId => {
    return http.get(`/calendars/${dateId}`);
};

const create = calendar => {
    return http.post("/calendars", calendar);
};

const update = (dateId, calendar) => {
    return http.put(`/calendars/${dateId}`, calendar);
};

const remove = dateId => {
    return http.delete(`/calendars${dateId}`);
}

export default {
    getAll,
    get,
    create,
    update,
    remove
}
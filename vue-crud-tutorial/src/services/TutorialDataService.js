import http from "../http-common";

// http is a axios instance , we can use [instance].METHODS to access 
// the corresponding url in the back-end and it will pass some data to
// the back-end. 
// You can get them from req (For example, req.body,req.query ...)
class TutorialDataServices {
    getAll() {
        return http.get("/tutorials");
    }
    get(id) {
        return http.get(`/tutorials/${id}`);
    }
    create(data) {
        return http.post("tutorials",data)
    }
    update(id,data) {
        return http.put(`/tutorials/${id}`,data);
    }
    delete(id) {
        return http.delete(`tutorials/${id}`);
    }
    deleteAll() {
        return http.delete(`/tutorials`)
    }
    findByTitle(title) {
        return http.get(`tutorials?title=${title}`)
    }

}

export default new TutorialDataServices()
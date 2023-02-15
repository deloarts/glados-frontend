import { request, requestConfig, requestConfigXlsxDownload } from "./index";

export class UsersRequest {
    // GET
    getUsers() { return request.get("/api/web/v1/users/", requestConfig(null)); }
    getUsersMe() { return request.get("/api/web/v1/users/me/", requestConfig(null)); }
    getUsersId(id: Number) { return request.get(`/api/web/v1/users/${id}/`, requestConfig(null)); }

    // POST
    postUsers(data: object) { return request.post("/api/web/v1/users/", requestConfig(null), data); }

    // PUT
    putUsers(id: Number, data: any) { return request.put(`/api/web/v1/users/${id}/`, requestConfig(null), data) }
    putUsersMe(data: any) { return request.put(`/api/web/v1/users/me/`, requestConfig(null), data) }
}

export const usersRequest = new UsersRequest();

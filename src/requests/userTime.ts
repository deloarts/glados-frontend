import { request, requestConfig } from "./index";
import type { UserTimeCreateSchema, UserTimeUpdateSchema } from "@/schemas/userTime";

export class UserTimeRequest {
  // GET
  getUserTime(params: URLSearchParams) {
    return request.get("/api/web/v1/user-time/", requestConfig(params));
  }
  getUserTimeByID(id: number) {
    return request.get(`/api/web/v1/user-time/${id}/`, requestConfig(null));
  }
  getUserLoginTime() {
    return request.get(`/api/web/v1/user-time/login/`, requestConfig(null));
  }

  // POST
  postUserTime(data: UserTimeCreateSchema) {
    return request.post("/api/web/v1/user-time/", requestConfig(null), data);
  }
  postUserTimeLogin() {
    return request.post("/api/web/v1/user-time/login", requestConfig(null), null);
  }
  postUserTimeLogout() {
    return request.post("/api/web/v1/user-time/logout", requestConfig(null), null);
  }

  // PUT
  putUserTimeByID(id: number, data: UserTimeUpdateSchema) {
    return request.put(`/api/web/v1/user-time/${id}/`, requestConfig(null),data);
  }
  putUserTimeLogin(id: number, value: string) {
    const params = new URLSearchParams()
    params.append('value', value)
    return request.put(
      `/api/web/v1/user-time/${id}/login/`,
      requestConfig(params),
      null,
    )
  }
  putUserTimeLogout(id: number, value: string) {
    const params = new URLSearchParams()
    params.append('value', value)
    return request.put(
      `/api/web/v1/user-time/${id}/logout/`,
      requestConfig(params),
      null,
    )
  }
  putUserTimeNote(id: number, value: string) {
    const params = new URLSearchParams()
    params.append('value', value)
    return request.put(
      `/api/web/v1/user-time/${id}/field/optional/note/`,
      requestConfig(params),
      null,
    )
  }

  // DELETE
  deleteUserTimeByID(id: number) {
    return request.delete(`/api/web/v1/user-time/${id}/`, requestConfig(null));
  }
}

export const userTimeRequest = new UserTimeRequest();

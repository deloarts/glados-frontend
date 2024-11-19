import { request, requestConfig } from "./index";
import type {
  ProjectCreateSchema,
  ProjectUpdateSchema,
} from "@/schemas/project";

export class ProjectsRequest {
  // GET
  getProjects(params: URLSearchParams) {
    return request.get("/api/web/v1/projects/", requestConfig(params));
  }
  getProjectsMy() {
    return request.get("/api/web/v1/projects/my/", requestConfig(null));
  }
  getProjectsID(id: Number) {
    return request.get(`/api/web/v1/projects/${id}/`, requestConfig(null));
  }
  getProjectsNumber(number: String) {
    return request.get(
      `/api/web/v1/projects/number/${number}/`,
      requestConfig(null),
    );
  }

  // POST
  postProjects(data: ProjectCreateSchema) {
    return request.post("/api/web/v1/projects/", requestConfig(null), data);
  }

  // PUT
  putProjects(id: Number, data: ProjectUpdateSchema) {
    return request.put(
      `/api/web/v1/projects/${id}/`,
      requestConfig(null),
      data,
    );
  }

  // DELETE
  deleteProjects(id: Number) {
    return request.delete(`/api/web/v1/projects/${id}/`, requestConfig(null));
  }
}

export const projectsRequest = new ProjectsRequest();

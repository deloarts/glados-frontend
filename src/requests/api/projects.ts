import { request } from '@/requests/index'
import { requestConfig } from '@/requests/config'
import constants from '@/constants'

import type { AxiosResponse } from 'axios'
import type { ProjectSchema, ProjectCreateSchema, ProjectUpdateSchema } from '@/schemas/project'
import type { PageSchema } from '@/schemas/page'
import type { ErrorDetailSchema, ErrorValidationSchema } from '@/schemas/common'

export class ProjectsRequest {
  // GET
  getProjects(params: URLSearchParams): Promise<AxiosResponse<PageSchema<ProjectSchema>>> {
    return request.get(constants.apiProjects, requestConfig(params))
  }
  getProjectsMy(): Promise<AxiosResponse<ProjectSchema[]>> {
    return request.get(`${constants.apiProjects}/my/`, requestConfig(null))
  }
  getProjectsID(id: number): Promise<AxiosResponse<ProjectSchema | ErrorDetailSchema>> {
    return request.get(`${constants.apiProjects}/${id}/`, requestConfig(null))
  }
  getProjectsNumber(number: string): Promise<AxiosResponse<ProjectSchema | ErrorDetailSchema>> {
    return request.get(`${constants.apiProjects}/number/${number}/`, requestConfig(null))
  }

  // POST
  postProjects(
    data: ProjectCreateSchema,
  ): Promise<AxiosResponse<ProjectSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    return request.post(constants.apiProjects, requestConfig(null), data)
  }

  // PUT
  putProjects(
    id: number,
    data: ProjectUpdateSchema,
  ): Promise<AxiosResponse<ProjectSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    return request.put(`${constants.apiProjects}/${id}/`, requestConfig(null), data)
  }

  // DELETE
  deleteProjects(id: number): Promise<AxiosResponse<ProjectSchema | ErrorDetailSchema>> {
    return request.delete(`${constants.apiProjects}/${id}/`, requestConfig(null))
  }
}

export const projectsRequest = new ProjectsRequest()

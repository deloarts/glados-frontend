import axios from "axios";
import router from "../router/index";
import config from "../config";

export function requestConfig(urlSearchParams: any) {
  const tokenType = localStorage.getItem("gladosTokenType");
  const tokenValue = localStorage.getItem("gladosTokenValue");
  return {
    params: urlSearchParams,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "*",
      "Authorization": `${tokenType} ${tokenValue}`,
    },
  };
}

export function requestConfigFileUpload(urlSearchParams: any) {
  const tokenType = localStorage.getItem("gladosTokenType");
  const tokenValue = localStorage.getItem("gladosTokenValue");
  return {
    params: urlSearchParams,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "*",
      "Authorization": `${tokenType} ${tokenValue}`,
      "Content-Type": "multipart/form-data"
    },
  };
}

export function requestConfigXlsxDownload(urlSearchParams: any) {
  const tokenType = localStorage.getItem("gladosTokenType");
  const tokenValue = localStorage.getItem("gladosTokenValue");
  return {
    params: urlSearchParams,
    responseType: "arraybuffer",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "*",
      "Authorization": `${tokenType} ${tokenValue}`,
      "Content-Disposition": "attachment; filename=glados.xlsx",
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    },
  };
}

export class Request {
  login(username: string, password: string) {
    const url = config.server + config.apiAccessToken;
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    return axios.post(url, params
    ).then(response => {
      localStorage.setItem("gladosTokenValue", response.data.access_token);
      localStorage.setItem("gladosTokenType", response.data.token_type);
      return response;
    }).catch(error => {
      console.error(error.response.data.detail);
      return error.response;
    });
  }

  get(api: string, params: any) {
    const url = config.server + api;

    console.log(`Sending get request to ${url} with params ${params}`)
    return axios.get(url, params //requestConfig(params)
    ).then(response => {
      console.log(`Response from get request to ${url}`, response);
      return response;
    }).catch(error => {
      if (error.response.status === 401) {
        console.warn(error.response.data.detail);
        router.push({name:"Login"});
      }
      console.error(error.response.data.detail);
      return error.response;
    });
  }

  // getXlsx(api: string, params: any) {
  //   const url = config.server + api;

  //   console.log(`Sending get request to ${url} with params ${params}`)
  //   //@ts-ignore
  //   return axios.get(url, requestConfigXlsxDownload(params)
  //   ).then(response => {
  //     console.log(`Response from get request to ${url}`, response);
  //     return response;
  //   }).catch(error => {
  //     if (error.response.status === 401) {
  //       console.warn(error.response.data.detail);
  //       router.push({name:"Login"});
  //     }
  //     console.error(error.response.data.detail);
  //     return error.response;
  //   });
  // }


  post(api: string, params: any, data: any) {
    const url = config.server + api;

    console.log(`Sending post request to ${url} with params ${params} and data${data}`)
    return axios.post(url, data, params // requestConfig(params)
    ).then(response => {
      console.log(`Response from post request to ${url}`, response);
      return response;
    }).catch(error => {
      if (error.response.status === 401) {
        console.warn(error.response.data.detail);
        router.push({name:"Login"});
      }
      console.error(error.response.data.detail);
      return error.response;
    });
  }

  put(api: string, params: any, data: any) {
    const url = config.server + api;

    console.log(`Sending put request to ${url} with params ${params} and data${data}`)
    return axios.put(url, data, params //requestConfig(params)
    ).then(response => {
      console.log(`Response from put request to ${url}`, response);
      return response;
    }).catch(error => {
      if (error.response.status === 401) {
        console.warn(error.response.data.detail);
        router.push({name:"Login"});
      }
      console.error(error.response.data.detail);
      return error.response;
    });
  }

  delete(api: string, params: any) {
    const url = config.server + api;

    console.log(`Sending delete request to ${url} with params ${params}`)
    return axios.delete(url, params //requestConfig(params)
    ).then(response => {
      console.log(`Response from delete request to ${url}`, response);
      return response;
    }).catch(error => {
      if (error.response.status === 401) {
        console.warn(error.response.data.detail);
        router.push({name:"Login"});
      }
      console.error(error.response.data.detail);
      return error.response;
    });
  }
}

export const request = new Request();

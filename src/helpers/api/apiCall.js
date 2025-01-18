// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

import { message } from "antd"

export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = {}
  if (customConfig.token)
    headers.Authorization = `Bearer ${customConfig.token}`

  const config = {
    cache: "no-cache",
    method: customConfig.method,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body && customConfig.isForm === undefined) {
    config.body = JSON.stringify(body)
  }

  if (customConfig.isForm) {
    config.body = body
    config.headers = {
      "Authorization": `Bearer ${customConfig.token}`
    }
  }

  let data

  try {
    const response = await window.fetch(endpoint, config)

    if (response.ok) {
      data = await response.json().catch((e) => console.log(e));
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      }
    }

    const errorResponse = await response.json().catch(() => null);
    if (errorResponse.status == 400) {
      message.info(errorResponse.detail)
      return Promise.reject(errorResponse.detail)
    }

    if (errorResponse.status == 500) {
      message.error(errorResponse.detail)
      return Promise.reject(errorResponse.detail)
    }

    if (errorResponse.status == 401) {
      message.error(errorResponse.detail)
      return Promise.reject(errorResponse.detail)
    }

  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, {
    ...customConfig, headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }, method: 'GET'
  })
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, {
    ...customConfig, headers: customConfig.headers === undefined ? {
      Accept: "*/*",
      "Content-Type": "application/json",
      Connection: "keep-alive",
      "Accept-Encoding": "gzip,deflate,br",
      "Access-Control-Allow-Origin": "*",
    } : customConfig.headers, method: 'POST', body
  })
}

client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint, {
    ...customConfig, headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Connection: "keep-alive",
      "Accept-Encoding": "gzip,deflate,br",
      "Access-Control-Allow-Origin": "*",
    }, method: 'PUT', body
  })
}

client.delete = function (endpoint, body, customConfig = {}) {
  return client(endpoint, {
    ...customConfig, headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Connection: "keep-alive",
      "Accept-Encoding": "gzip,deflate,br",
      "Access-Control-Allow-Origin": "*",
    }, method: 'DELETE', body
  })
}

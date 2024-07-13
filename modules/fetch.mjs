import fetch from 'node-fetch';

export async function doGET(url, options) {
  try {
    const response = await fetch(url, Object.assign(Object.assign({}, options), { method: 'GET' }));
    return await handleResponse(response);
  }
  catch (error) {
    console.error(`GET request to ${url} failed`, error);
    throw error;
  }
}

export async function doPOST(url, body, options) {
  try {
    const response = await fetch(url, Object.assign(Object.assign({}, options), { method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, ((options === null || options === void 0 ? void 0 : options.headers) || {})), body: JSON.stringify(body) }));
    return await handleResponse(response);
  }
  catch (error) {
    console.error(`POST request to ${url} failed`, error);
    throw error;
  }
}

async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
  }
  return await response.json();
}
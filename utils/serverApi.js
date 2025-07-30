import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export const serverApiRequest = (url, params, query = null, token) => {
  const headers = {
    Authorization: token
      ? token
      : cookie.get("user_token")
      ? cookie.get("user_token")
      : "",
    Accept: "application/json",
  };
  
  const baseUrl = process.env.BASE_URL || 'https://demo.asrstock.com/api/';
  let requestUrl = "";
  if (query === null) {
    requestUrl = baseUrl + url.relativeUrl;
  } else {
    requestUrl = baseUrl + url.relativeUrl + query;
  }
  
  console.log(`Making API request to: ${requestUrl}`);
  
  return axios({
    method: url.method,
    url: requestUrl,
    data: params,
    headers,
  }).catch(error => {
    console.error(`API request failed for ${requestUrl}:`, error.message);
    throw error;
  });
};
export const getServerApiRequest = (url, params, token) => {
  const headers = {
    Authorization: token
      ? token
      : cookie.get("user_token")
      ? cookie.get("user_token")
      : "",
    Accept: "application/json",
  };
  
  const baseUrl = process.env.BASE_URL || 'https://demo.asrstock.com/api/';
  const fullUrl = `${baseUrl}${url}`;
  
  console.log(`Making API request to: ${fullUrl}`);
  
  return axios({
    method: "GET",
    url: fullUrl,
    data: params,
    headers,
  }).catch(error => {
    console.error(`API request failed for ${fullUrl}:`, error.message);
    throw error;
  });
};

import superagent from "superagent";
import Cookies from "universal-cookie";
import { IS_LOADING, THROW_ERROR, THROW_SUCCESS } from "../redux/types";
const cookie = new Cookies();

export const postRequest = (
  url,
  data,
  dispatch,
  cookie_option = null,
  history = null,
  actions,
  slug
) => {
  const baseUrl = process.env.BASE_URL || 'https://demo.asrstock.com/api/';
  const fullUrl = `${baseUrl}${url}`;
  
  console.log(`Making POST request to: ${fullUrl}`);
  
  return superagent
    .post(fullUrl)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          if (cookie_option === "save") {
            let token = "Bearer " + res.body.data.access_token;
            cookie.set("user_token", token, { path: "/" });
          } else if (cookie_option === "delete") {
            cookie.remove("user_token");
          }
          if (history) {
            history.push(slug);
          }
          if (actions) {
            actions.resetForm({});
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        console.error(`POST request failed for ${fullUrl}:`, err);
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export function getRequest(
  url,
  data,
  dispatch,
  type = null,
  token = true,
  isloading
) {
  if (isloading) dispatch({ type: IS_LOADING, payload: true });
  
  const baseUrl = process.env.BASE_URL || 'https://demo.asrstock.com/api/';
  const fullUrl = `${baseUrl}${url}`;
  
  console.log(`Making GET request to: ${fullUrl}`);
  
  return superagent
    .get(fullUrl)
    .query(data)
    .set("accept", "application/json")
    .set("Authorization", token ? cookie.get("user_token") : null)
    .end((err, res) => {
      if (res) {
        if (type !== null) {
          dispatch({ type: type, payload: res.body });
        }
        if (isloading) {
          dispatch({ type: IS_LOADING, payload: false });
        }
        if (res.body.reload) {
          window.location.reload();
        }
      } else {
        console.error(`GET request failed for ${fullUrl}:`, err);
        if (isloading) {
          dispatch({ type: IS_LOADING, payload: false });
        }
      }
    });
}

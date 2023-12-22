import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.withCredentials = true;

const getUser = () => {
  const jwt_token = Cookies.get("access_token");
  let decodedToken;
  if (jwt_token) {
    decodedToken = jwtDecode(jwt_token)
  }
  return decodedToken ? decodedToken : null;
}

const makeRequest = async({url, method="get", body=null, useAuthorization=false}) => {
  const headers = useAuthorization ? {
    Authorization : "Bearer " + getUser()
  } : {};

  const res = await axios({
    url,
    method,
    headers,
    data : body
  });        

  return res;
};


export {makeRequest, getUser};
import axios from "axios";
import CryptoJS from "crypto-js"

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.withCredentials = true;

const encryptData = (data) => {
  try {
    // return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_SECRET_KEY).toString();
    return data
  } catch(e) {
    return e;
  }
}

const decryptData = (data) => {
  // return CryptoJS.AES.decrypt(data, process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
  return data
}

const getUser = () => {
  // return (localStorage && localStorage.user) ? localStorage.user : null;
  return
}

const makeRequest = async({url, method="get", body=null, useAuthorization=false}) => {
  const headers = useAuthorization ? {
    Authorization : "Bearer " + getUser()
  } : {};

  const encryptedBody = {
    data : encryptData(body)
  }

  const res = await axios({
    url,
    method,
    headers,
    data: encryptedBody
  });        

  return res;
};


export {makeRequest, encryptData, decryptData, getUser};
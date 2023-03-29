import axios from "axios";
import qs from "qs";
import CryptoJS from "crypto-js";


var paramsData;


const setHeaders = (isAuthRequired) => {
  return new Promise((resolve, reject) => {
    if (isAuthRequired) {
      var user1 = window.sessionStorage.getItem("login_token");
      let difference;
      let user;
      let keydata;
      
      if (user1) {
        user = JSON.parse(window.sessionStorage.getItem("login_token"));
        difference =
          Math.abs(new Date().getTime() - new Date(user.loginTime).getTime()) /
          1000;
        if (difference > user.expiresIn - 10) {
          //   return loginApi
          //      .refreshToken(user)
          //     .then((LoginDetail) => {
          //       let user1 = {
          //         ...LoginDetail.data.data,
          //         refreshToken: user.refreshToken,
          //       };
          //       user1.loginTime = new Date();
          //       window.sessionStorage.setItem("user", JSON.stringify(user1));
          //       resolve({
          //         "Content-Type": "application/json",
          //         Authorization: "Bearer " + user1.temp_token,
          //       });
          //     })
          //     .catch((err) => {
          //       reject(err);
          //     });
        } else {
            resolve({
              "Content-Type": "application/json",
              Authorization: "Bearer " + user.access_token,
            });
          
        }
      }
    } else {
      resolve({
        "Content-Type": "application/json",
      });
    }
  });
};

const logError = (error) => {
  if (error["response"]) {
  } else {
  }
};

class NetworkManger {
  static get(url, isAuthRequired = true, params = {}) {
    let config = {};
    paramsData = params;

    return setHeaders(isAuthRequired)
      .then((headers) => {
        config["headers"] = headers;
        config["params"] = new URLSearchParams(params);
        return axios.get(url, config);
      })
      .catch((err) => {
        if (
          err.response &&
          (err.response.status == 401 || err.response.status == 403)
        ) {
          window.location.assign(window.location.origin + "/");
        }
        logError(err);
        throw err;
      });
  }
  static post(url, data, isAuthRequired = true, params = {}) {
    let config = {};
    paramsData = data;
    return setHeaders(isAuthRequired)
      .then((headers) => {
        config["headers"] = headers;
        config["params"] = params;
        return axios.post(url, data, config);
      })
      .catch((err) => {
        if (
          !url.includes("authenticate") ||
          (data && data["grantType"] === "refresh_token")
        ) {
          if (
            err.response &&
            (err.response.status == 401 || err.response.status == 403)
          ) {
            window.location.assign(window.location.origin + "/");
          }
        }
        logError(err);
        throw err;
      });
  }

  static postMultipart(url, data, isAuthRequired = true, params = {}) {
    let config = {};
    return setHeaders(isAuthRequired)
      .then((headers) => {
        config["headers"] = {
          "Content-Type": "multipart/form-data; boundary=MultipartBoundary",
          Authorization:
            "Bearer " +
            JSON.parse(window.sessionStorage.getItem("user")).accessToken,
        };
        return axios.post(url, data, config);
      })
      .catch((err) => {
        if (
          err.response &&
          (err.response.status == 401 || err.response.status == 403)
        ) {
          window.location.assign(window.location.origin + "/");
        }
        logError(err);
        throw err;
      });
  }

  static put(url, data, isAuthRequired = true, params = {}) {
    let config = {};
    return setHeaders(isAuthRequired)
      .then((headers) => {
        config["headers"] = headers;
        config["params"] = params;
        return axios.put(url, data, config);
      })
      .catch((err) => {
        if (
          err.response &&
          (err.response.status == 401 || err.response.status == 403)
        ) {
          window.location.assign(window.location.origin + "/");
        }
        logError(err);
        throw err;
      });
  }
  static delete(url, isAuthRequired = true, params = {}) {
    let config = {};
    return setHeaders(isAuthRequired)
      .then((headers) => {
        config["headers"] = headers;
        config["params"] = params;
        return axios.delete(url, config);
      })
      .catch((err) => {
        if (
          err.response &&
          (err.response.status == 401 || err.response.status == 403)
        ) {
          window.location.assign(window.location.origin + "/");
        }
        logError(err);
        throw err;
      });
  }
}

export default NetworkManger;

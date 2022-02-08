import API from "../Api";
export function loginUser(data) {
    console.log('data login actions',data)
  return dispatch =>
    // API.loginApi.post(null, data).then(
    //   result => {
       
        dispatch({
          type: "LOGIN_SUCCESS",
          data: data
        });
      // },
      // err => {
      //   let errorMsg = "Something Went Wrong";
      //   if (err && err.error === "invalid_grant") {
      //     errorMsg = "Username or password is Incorrect";
      //   }
      //   dispatch({
      //     type: "FAILED",
      //     data: errorMsg
      //   });
      // }
    //);
}
export function logout() {
  return {
    type: "LOGOUT",
    data: {}
  };
}


export function setUserDetails(data) {
  return {
    type: "SET_USER_DETAILS",
    data
  };
}

export function forgotPassword(data, callback) {
  return dispatch =>
    API.forgotPassword.post(null, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}


export function validateToken(data,callback){
  return dispatch =>
  API.validateToken.post(null, { ...data }).then(
    result => {
      callback(null, result);
    },
    err => callback(err)
  );
}



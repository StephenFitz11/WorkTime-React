import axios from "axios";
import auth from "./authService";

axios.defaults.headers.common["x-auth-token"] = auth.getJwt();

axios.interceptors.response.use(null, error => {
  // const expectedError =
  //   error.response &&
  //   (error.response.status >= 400) & (error.response.status < 500);

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put
};

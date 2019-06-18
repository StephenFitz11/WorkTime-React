import http from "./httpService";
import { apiUrl } from "../config/default.json";
import jwtDecode from "jwt-decode";

const authEndpoint = apiUrl + "/auth";

// TODO: Problem: When auth module used, error is thrown on line 4 of http service. "Default not defined."
//

export async function login(email, password) {
  const { data: jwt } = await http.post(authEndpoint, {
    email: email,
    password: password
  });
  localStorage.setItem("token", jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt
};

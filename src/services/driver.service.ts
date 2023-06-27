import axios from "axios";
import driverauthheader from "./driverAuth-header";
const API_URL = "http://localhost:8080/api/driver/";

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
export const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: driverauthheader() });
};
export const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: driverauthheader() });
};
export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: driverauthheader() });
};
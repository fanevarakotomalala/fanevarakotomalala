import axios from "axios";
const API_URL = "http://localhost:8080/api/driver/";

export const register = (cin: string, drivername: string, surname:string, email:string ,password: string , adresse:string) => {
  return axios.post(API_URL + "signup", {
     cin,
     drivername,
     surname,
     email,
     password,
     adresse
  });
};
export const login = async (drivername: string, password: string) => {
  const response = await axios
    .post(API_URL + "signin", {
      drivername,
      password,
    });
  if (response.data.accessToken) {
    localStorage.setItem("driver", JSON.stringify(response.data));
  }
  return response.data;
};
export const logout = () => {
  localStorage.removeItem("driver");
};
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("driver");
  if (userStr) return JSON.parse(userStr);
  return null;
};
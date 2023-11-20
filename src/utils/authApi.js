import axios from 'axios';
//import env from 'react-dotenv';

const baseUrl = process.env.REACT_APP_API_URL;

export const authenticate = async (data) => {
  try {
    return await axios.post(`${baseUrl}/users/login`, data);
  } catch (e) {
    console.log(e);
  }
};

export const registerUser = async (data) => {
  try {
    return await axios.post(`${baseUrl}/users/register`, data);
  } catch (e) {
    console.log(e);
  }
};

export const getUserById = async (userId) => {
  try {
    return await axios.get(`${baseUrl}/users/${userId}`);
  } catch (e) {
    console.log(e);
  }
};

export const getRefreshToken = async (data) => {
  try {
    return await axios.post(`${baseUrl}/users/refresh-token`, data);
  } catch (e) {
    console.log(e);
  }
}
require('dotenv').config({path:"/home/human/Work/spehr(ethereum)/.env"});
import axios from "axios";

export const API_URL = process.env.REACT_APP_SERVER_URL || '';

export default axios.create({
  baseURL: API_URL,
});
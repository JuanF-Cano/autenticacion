// Definir una clase estatica para manejar las llamadas a la API de TMDB

import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

class TMDB_API {
  static api = axios.create({
    baseURL: BASE_URL,
    params: {
      api_key: API_KEY,
    },
  });

  static async get(endpoint, params) {
    return this.api.get(endpoint, params);
  }
}

export default TMDB_API;

import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "http://localhost:6039/",
});

export default clienteAxios;

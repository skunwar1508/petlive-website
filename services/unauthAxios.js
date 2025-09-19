import axios from "axios";
import ROOT_URL from "./api-url";


const UnauthAxios = axios.create();
UnauthAxios.defaults.baseURL = ROOT_URL;

export default UnauthAxios;
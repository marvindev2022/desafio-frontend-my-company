import axios from "axios";

export default  axios.create({
  baseURL: " https://outros.opea-uat.solutions/prova/front/api/clients",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

import axios from "axios";

const Axios = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/",
});

export const getAll = () => {
  return Axios.get("/products")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

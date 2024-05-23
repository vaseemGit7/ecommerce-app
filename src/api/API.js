import axios from "axios";

const Axios = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/",
});

export const getAll = (offesetVal) => {
  return Axios.get(`/products?offset=${offesetVal}&limit=12`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getProduct = (id) => {
  return Axios.get(`/products/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

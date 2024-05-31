import axios from "axios";

const Axios = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/",
});

const rapidApiAxios = axios.create({
  baseURL: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "94876875d7mshe7c1cbc05508effp1d2569jsna270fe653dc2",
    "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
  },
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

export const getHMProducts = (currentPage, limit, state) => {
  const params = {
    country: "in",
    lang: "en",
    currentpage: currentPage,
    pagesize: limit,
    categories: "men_all",
    sortBy: state.sortBy,
    query: state.searchQuery,
  };

  return rapidApiAxios
    .get("/products/list", { params })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getProductDetail = (productCode) => {
  const params = {
    lang: "en",
    country: "in",
    productcode: productCode,
  };

  return rapidApiAxios
    .get("/products/detail", { params })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

import axios from "axios";

const rapidApiAxios = axios.create({
  baseURL: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_REACT_API_KEY,
    "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
  },
});

const getOptionalParams = (paramsData) => {
  let optionalParams = "";
  let isFirstParam = true;

  Object.entries(paramsData).forEach(([key, values]) => {
    if (Array.isArray(values) && values.length > 0) {
      values.forEach((value) => {
        if (isFirstParam) {
          optionalParams += `?${key}=${value}`;
          isFirstParam = false;
        } else {
          optionalParams += `&${key}=${value}`;
        }
      });
    } else if (
      !Array.isArray(values) &&
      values !== undefined &&
      values !== null &&
      values !== ""
    ) {
      if (isFirstParam) {
        optionalParams += `?${key}=${values}`;
        isFirstParam = false;
      } else {
        optionalParams += `&${key}=${values}`;
      }
    }
  });

  return optionalParams;
};

export const getHMProducts = (currentPage, limit, state, catergoryCode) => {
  const optionalParams = getOptionalParams(state);

  const params = {
    country: "in",
    lang: "en",
    currentpage: currentPage,
    pagesize: limit,
    categories: catergoryCode,
  };

  return rapidApiAxios
    .get(`/products/list${optionalParams}`, { params })
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

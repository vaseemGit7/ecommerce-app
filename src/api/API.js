import axios from "axios";

// const Axios = axios.create({
//   baseURL: "https://api.escuelajs.co/api/v1/",
// });

const rapidApiAxios = axios.create({
  baseURL: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "f65ee0d744msha0a5229ab0e83ccp1a3ca5jsn980d42dd8ba3",
    "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
  },
});

// export const getAll = (offesetVal) => {
//   return Axios.get(`/products?offset=${offesetVal}&limit=12`)
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => console.log(err));
// };

// export const getProduct = (id) => {
//   return Axios.get(`/products/${id}`)
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => console.log(err));
// };

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

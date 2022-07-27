import axios from "axios";

export const ENDPOINT =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "someDeployeURL";

export const getDataCategory = async () => {
  try {
    const res = await axios.get(`${ENDPOINT}/category-product`);
    if (res.data.success) {
      return res.data.cat;
    }
  } catch (error) {
    return error;
  }
};

export const getProducts = async ({ queryKey }) => {
  // console.log(params);
  const params = queryKey[1];
  const maxPrice = params.maxPrice ? `&maxPrice=${params.maxPrice}` : "";
  const minPrice = params.minPrice ? `&minPrice=${params.minPrice}` : "";
  const sttSort = params.sttSort ? `&sttSort=${params.sttSort}` : "";
  const limit = params.limit ? `&limit=${params.limit}` : "";
  const keySearch = params.keySearch ? `&keySearch=${params.keySearch}` : "";
  const brand = params.brand ? `&brand=${params.brand}` : "";
  const categoryId = params.categoryId
    ? `&categoryId=${params.categoryId}`
    : "";
  const minMaxPrice = params.minMaxPrice
    ? `&minMaxPrice=${params.minMaxPrice}`
    : "";
  const page = params.page ? `&page=${params.page}` : "";
  const idProducts = params.idProducts
    ? `&idProducts=${params.idProducts}`
    : "";

  try {
    const pathApi = `${ENDPOINT}/products?${categoryId}${maxPrice}${minPrice}${sttSort}${limit}${keySearch}${brand}${minMaxPrice}${page}${idProducts}`;

    const res = await axios.get(pathApi);
    if (res.data.success) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    if (error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

export const getArticle = async ({ queryKey }) => {
  // console.log(params, "chek params");
  const params = queryKey[1];
  const type = params.type ? `&type=${params.type}` : "";
  const idCategory = params.idCategory
    ? `&idCategory=${params.idCategory}`
    : "";
  const limit = params.limit ? `&limit=${params.limit}` : "";
  const pathApi = `${ENDPOINT}/article?${type}${idCategory}${limit}`;

  try {
    const res = await axios.get(pathApi);
    if (res.data.success) {
      return {
        article: res.data.article,
        total: res.data.total,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getBanerCategory = async ({ queryKey }) => {
  const params = queryKey[0];
  const idCategory = params.idCategory
    ? `&idCategory=${params.idCategory}`
    : "";
  const pathApi = `${ENDPOINT}/banner/category?${idCategory}`;

  try {
    const res = await axios.get(pathApi);
    if (res.data.success) {
      return [...res.data.banner];
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRate = async (params) => {
  const { idProduct } = params;
  const pathApi = `${ENDPOINT}/rate/${idProduct}`;
  try {
    const res = await axios.get(pathApi);
    if (res.data.success) {
      return res.data.rate;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createRate = async (newData) => {
  try {
    const res = await axios.post(`${ENDPOINT}/rate`, newData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const replyRate = async (newData) => {
  // console.log(newData);
  try {
    const res = await axios.put(`${ENDPOINT}/rate/reply`, newData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

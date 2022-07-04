import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import Data from "../data.json";

const dataCategoryProduct = _.find(Data, "all_category").all_category.product;

const getProductToCart = (data) => {
  const CatHasProduct = data.filter((category) => {
    return category.product !== false;
  });
  const dataToCart = CatHasProduct.map((cat) => {
    return { id: cat.product.id, count: cat.product.countBuild };
  });
  return dataToCart;
};

const getCategoryBuild = (dataArr) => {
  var dataInnitalBuildPc = [];

  const findBuildPC = (itemCat) => {
    itemCat.forEach((item) => {
      if (item.buildPc === 1) {
        dataInnitalBuildPc.push({
          nameCategory: item.name,
          id: item.id,
          children: item.children,
          product: false,
        });
      }
      if (item.children && item.children.length) {
        findBuildPC(item.children);
      }
    });
  };

  dataArr.forEach((item) => {
    if (item.buildPc === 1) {
      dataInnitalBuildPc.push({
        nameCategory: item.name,
        id: item.id,
        children: item.children,
        product: false,
      });
    }
    if (item.children && item.children.length > 0) {
      findBuildPC(item.children);
    }
  });

  return dataInnitalBuildPc;
};

const handleAddProduct = (state, productInfo) => {
  const categoryIndex = state.categoryProduct.findIndex((category) => {
    if (category.id === productInfo.idCategory) {
      return category.id === productInfo.idCategory;
    } else {
      if (category.children.length > 0) {
        const checkChildren = category.children.find((i) => {
          return i.id === productInfo.idCategory;
        });
        if (checkChildren) {
          return true;
        }
      }
    }
    return category.id === productInfo.idCategory;
  });

  if (categoryIndex >= 0) {
    const product = {
      ...productInfo.product,
      countBuild: 1,
      totalBuild: productInfo.product.price,
    };
    state.categoryProduct[categoryIndex].product = product;

    const totalPriceBuild = state.categoryProduct.reduce((a, b) => {
      return a + (b.product ? b.product.totalBuild : 0);
    }, 0);

    state.sumaryBuild.totalPrice = totalPriceBuild;

    state.sumaryBuild.listIdProduct = getProductToCart(state.categoryProduct);
    return state;
  }
  return state;
};

const handleUpdateProduct = (state, data) => {
  const { countProduct, idCategory } = data;
  const categoryIndex = state.categoryProduct.findIndex(
    (category) => category.id === idCategory
  );
  if (categoryIndex >= 0) {
    const price = state.categoryProduct[categoryIndex].product.price;
    const totalPrice = (countProduct ? countProduct : 1) * price;
    if (countProduct) {
      state.categoryProduct[categoryIndex].product.countBuild = countProduct;
    } else {
      state.categoryProduct[categoryIndex].product.countBuild = "";
    }
    state.categoryProduct[categoryIndex].product.totalBuild = totalPrice;

    const totalPriceBuild = state.categoryProduct.reduce((a, b) => {
      return a + (b.product ? b.product.totalBuild : 0);
    }, 0);

    state.sumaryBuild.totalPrice = totalPriceBuild;

    state.sumaryBuild.listIdProduct = getProductToCart(state.categoryProduct);

    return state;
  }
  return state;
};

const handleDeleteProduct = (state, idCategory) => {
  const categoryIndex = state.categoryProduct.findIndex((category) => {
    return category.id === idCategory;
  });

  if (categoryIndex >= 0) {
    state.categoryProduct[categoryIndex].product = false;

    const totalPriceBuild = state.categoryProduct.reduce((a, b) => {
      return a + (b.product ? b.product.totalBuild : 0);
    }, 0);

    state.sumaryBuild.totalPrice = totalPriceBuild;

    state.sumaryBuild.listIdProduct = getProductToCart(state.categoryProduct);

    return state;
  }
  return state;
};

const handleRefeshBuil = (state) => {
  state.categoryProduct.forEach((category) => (category.product = false));
  state.sumaryBuild = {
    totalPrice: 0,
    listIdProduct: [],
  };
};

const initialState = {
  categoryProduct: getCategoryBuild(dataCategoryProduct),
  sumaryBuild: {
    totalPrice: 0,
    listIdProduct: [],
  },
};

const rate = createSlice({
  name: "BuildPc",
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      const productInfo = action.payload;
      return handleAddProduct(state, productInfo);
    },
    updateProduct: (state, action) => {
      const data = action.payload;
      return handleUpdateProduct(state, data);
    },
    deleteProduct: (state, action) => {
      const idCategory = action.payload;
      return handleDeleteProduct(state, idCategory);
    },
    refreshBuild: (state, action) => {
      return handleRefeshBuil(state);
    },
  },
});

const { reducer, actions } = rate;
export const { addProduct, updateProduct, deleteProduct, refreshBuild } =
  actions;
export default reducer;

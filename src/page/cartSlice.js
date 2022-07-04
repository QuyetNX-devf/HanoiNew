import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { sortPrice } from "utils/category";

import Data from "../data.json";

const listProduct = _.find(Data, "all_product").all_product;
const initialState = {
  summaryCart: {
    count: 0,
    totalPrice: 0,
  },
  products: [],
};

function handleAddCart(data, listId, state) {
  let listProductCart = [...state.products];
  const listIdProductOld = listProductCart.map((pd) => "" + pd.id);

  if (JSON.stringify(listId) === JSON.stringify(listProductCart)) {
    return false;
  }

  const valid = listId.every((pd) => {
    if (listIdProductOld.includes(pd.id)) {
      alert("Sản phẩm đã có trong giỏ hàng");
      return false;
    }
    var product = data.find((product) => `${product.id}` === `${pd.id}`);
    const newProduct = {
      ...product,
      countCart: parseInt(pd.count),
      totalCart: parseInt(pd.count) * product.price,
    };
    listProductCart = [...listProductCart, newProduct];
    return true;
  });
  if (valid) {
    const listIdProductNew = listProductCart.map((product) => {
      return { id: product.id, count: product.countCart };
    });
    //ghi idproduc vào localStorage
    if (listIdProductNew)
      window.localStorage.setItem(
        "listIdProduct",
        JSON.stringify(listIdProductNew)
      );
    const countProduct = listProductCart.reduce((a, b) => a + b.countCart, 0);
    const totalPrice = listProductCart.reduce((a, b) => a + b.totalCart, 0);
    const newState = {
      summaryCart: {
        ...state.summaryCart,
        count: countProduct,
        totalPrice: totalPrice,
      },
      products: [...listProductCart],
    };
    return newState;
  }
}

const handleUpdateProduct = (state, producUpdate) => {
  const testNumber = /^[0-9]+$/;
  let checkValueCount = true;
  if (
    parseInt(producUpdate.countCart) <= 0 ||
    testNumber.test(producUpdate.countCart) === false
  ) {
    checkValueCount = false;
  }
  const pdIndex = state.products.findIndex(
    (product) => product.id === producUpdate.id
  );

  if (pdIndex >= 0) {
    state.products[pdIndex].totalCart =
      (checkValueCount ? parseInt(producUpdate.countCart) : 1) *
      state.products[pdIndex].price;
    if (checkValueCount) {
      state.products[pdIndex].countCart = parseInt(producUpdate.countCart);
    } else {
      state.products[pdIndex].countCart = "";
    }
    state.summaryCart.count = state.products.reduce(
      (a, b) => a + (b.countCart === "" ? 1 : b.countCart),
      0
    );
    state.summaryCart.totalPrice = state.products.reduce(
      (a, b) => a + b.totalCart,
      0
    );

    const listIdProductUpdate = state.products.map((product) => {
      return { id: product.id, count: product.countCart };
    });
    //ghi idproduc vào localStorage
    if (listIdProductUpdate)
      window.localStorage.setItem(
        "listIdProduct",
        JSON.stringify(listIdProductUpdate)
      );
  }
  return state;
};

const hanldeDeleteCart = (state, productId) => {
  state.products = state.products.filter((product) => product.id !== productId);
  state.summaryCart.count = state.products.reduce((a, b) => a + b.countCart, 0);

  state.summaryCart.totalPrice = state.products.reduce(
    (a, b) => a + b.totalCart,
    0
  );

  const listIdProductUpdate = state.products.map((product) => {
    return { id: product.id, count: product.countCart };
  });

  //ghi idproduc vào localStorage
  if (listIdProductUpdate)
    window.localStorage.setItem(
      "listIdProduct",
      JSON.stringify(listIdProductUpdate)
    );
  return state;
};

const hanldeAddListCart = (state, Idproducts) => {
  let listProductCart = [...state.products];

  // loaị các id trùng nhau trong danh sách idproduct gửi lên
  const listIdProduct = _.uniqBy(Idproducts, function (product) {
    return product.id;
  });

  // loại bỏ cái id trung nhau với state ở danh sách id gửi lên
  listIdProduct.forEach((product) => {
    const idPd = product.id;
    const findIdProduct = listProductCart.find((productCart) => {
      return productCart.id === idPd;
    });
    if (!findIdProduct) {
      let arrFindProduct = sortPrice({
        listProduct: listProduct,
        idProducts: `${product.id}`,
      });
      if (arrFindProduct.data.length > 0) {
        let findProduct = arrFindProduct.data[0];
        const countCart = parseInt(product.count);
        const totalPrice = countCart * findProduct.price;
        const newProduct = {
          ...findProduct,
          countCart: countCart,
          totalCart: totalPrice,
        };
        listProductCart.push(newProduct);
      }
    }
  });
  const listIdProductNew = listProductCart.map((product) => {
    return { id: product.id, count: product.countCart };
  });
  //ghi idproduc vào localStorage
  if (listIdProductNew)
    window.localStorage.setItem(
      "listIdProduct",
      JSON.stringify(listIdProductNew)
    );
  const countProduct = listProductCart.reduce((a, b) => a + b.countCart, 0);
  const totalPrice = listProductCart.reduce((a, b) => a + b.totalCart, 0);
  const newState = {
    summaryCart: {
      ...state.summaryCart,
      count: countProduct,
      totalPrice: totalPrice,
    },
    products: [...listProductCart],
  };
  return newState;
};

const cart = createSlice({
  name: "rate",
  initialState: initialState,
  reducers: {
    addCart: (state, action) => {
      const listIdProduct = action.payload;
      return handleAddCart(listProduct, listIdProduct, state);
    },
    addListCart: (state, action) => {
      const listProduct = action.payload;
      return hanldeAddListCart(state, listProduct);
    },
    updateCart: (state, action) => {
      const producUpdate = action.payload;
      return handleUpdateProduct(state, producUpdate);
    },
    deleteCart: (state, action) => {
      const productId = action.payload;
      return hanldeDeleteCart(state, productId);
    },
  },
});

const { reducer, actions } = cart;
export const { addCart, updateCart, deleteCart, addListCart } = actions;
export default reducer;

import _ from "lodash";

function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];

  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

export function sortPrice(props) {
  const {
    maxPrice,
    minPrice = 0,
    sttSort,
    listProduct,
    limit = 10,
    keySearch,
    brand,
    categoryId,
    minMaxPrice,
    page = 1,
    idProducts,
  } = props;

  let sortListproduct = [...listProduct];
  // let sortListproduct = [];

  if (idProducts) {
    const arrIdProduct = idProducts.split(",");
    let products = [];

    for (const idProduct of arrIdProduct) {
      const isProduct = sortListproduct.find(
        (product) => `${product.id}` === `${idProduct}`
      );
      if (isProduct) {
        products.push(isProduct);
      }
    }

    sortListproduct = products;
  }

  if (categoryId) {
    sortListproduct = _.filter(sortListproduct, {
      categoryInfo: [{ id: categoryId }],
    });
  }

  const arrBrand = sortListproduct.map((product) => product.brand);
  //loại brand trùng lặp
  const checkBrand = _.uniqBy(arrBrand, function (brand) {
    return brand.brand_index;
  });

  var maxFindPrice = null;
  var minFindPrice = null;
  if (minMaxPrice && sortListproduct.length > 0) {
    maxFindPrice = _.maxBy(sortListproduct, function (product) {
      return product.price;
    }).price;
    minFindPrice = _.minBy(sortListproduct, function (product) {
      return product.price;
    }).price;
  }

  if (maxPrice && minPrice) {
    sortListproduct = sortListproduct.filter(
      (item) =>
        item.price <= parseInt(maxPrice) && item.price >= parseInt(minPrice)
    );
  } else if (maxPrice) {
    sortListproduct = sortListproduct.filter(
      (item) => item.price <= parseInt(maxPrice)
    );
  } else if (minPrice) {
    sortListproduct = sortListproduct.filter(
      (item) => item.price >= parseInt(minPrice)
    );
  }

  if (sttSort === "price-asc") {
    sortListproduct = sortListproduct.sort((a, b) => a.price - b.price);
  }

  if (sttSort === "price-desc") {
    sortListproduct = sortListproduct.sort((a, b) => b.price - a.price);
  }

  if (keySearch) {
    sortListproduct = sortListproduct.filter((product, index) => {
      const value = removeAccents(keySearch);
      const { productName } = product;
      return (
        removeAccents(productName.toUpperCase()).indexOf(
          value.toUpperCase()
        ) !== -1
      );
    });
  }

  if (brand) {
    sortListproduct = sortListproduct.filter((product, index) => {
      return product.brand.brand_index === brand;
    });
  }

  const totalRows = sortListproduct.length;

  const start = (page - 1) * limit;

  const end = page * limit;

  const newProducts = sortListproduct.slice(start, end);

  return {
    total: totalRows,
    data: newProducts,
    brand: arrBrand ? checkBrand : [],
    minMaxPrice: minMaxPrice ? { min: minFindPrice, max: maxFindPrice } : null,
  };
}

export const getArticle = (props) => {
  const { dataArticle, type, limit = 10, page = 1, idCategory } = props;

  let listArticle = [...dataArticle];

  if (idCategory) {
    listArticle = _.filter(listArticle, {
      categoryInfo: [{ id: idCategory }],
    });
  }

  if (type === "featured") {
    listArticle = listArticle.filter(
      (article) => article.articleDetail.isFeatured === 1
    );
  }

  if (type === "new") {
    listArticle = listArticle.sort(
      (a, b) => +b.articleDetail.createDate - +a.articleDetail.createDate
    );
  }

  if (type === "visit") {
    listArticle = listArticle.sort(
      (a, b) => +b.articleDetail.visit - +a.articleDetail.visit
    );
  }

  const totalRows = listArticle.length;

  const start = (page - 1) * limit;

  const end = page * limit;

  const newArticle = listArticle.slice(start, end);

  return {
    total: totalRows,
    data: newArticle,
  };
};

export const getCategoryArticle = (props) => {
  const { dataCategory, idCategory } = props;
  const isCategory = dataCategory.find(
    (category) => category.id === idCategory
  );
  return isCategory;
};

export const getAllCategoryArticle = (props) => {
  const { data } = props;
  return data;
};

export const getArticleDetail = (props) => {
  const { dataArticle, idArticle } = props;
  const isArticle = dataArticle.find((article) => article.id === idArticle);
  return isArticle;
};

export const getBannerByIdCategory = (props) => {
  const { data, idCategory } = props;
  let banner = [];
  banner = _.filter(data, { categoryInfo: [{ id: idCategory }] });
  return banner;
};

export const getListCategoryProduct = (props) => {
  const { data, type } = props;
  let listCategory = [...data];
  let hashListCategory = [];

  const hashChildrenCategory = (data) => {
    if (data.children && data.children.length > 0) {
      data.children.forEach((item) => {
        let category = item;
        // delete category.children;
        hashListCategory = [...hashListCategory, category];
        if (item.children && item.children.length > 0) {
          hashChildrenCategory(item);
        }
      });
    }
  };

  listCategory.forEach((item) => {
    let category = item;
    // delete category.children;
    hashListCategory = [...hashListCategory, category];
    hashChildrenCategory(item);
  });

  if (type === "featured") {
    hashListCategory = hashListCategory.filter(
      (category) => category.isFeatured === 1
    );
  }

  return hashListCategory;
};

export const getAllCategoryProduct = (props) => {
  const { data } = props;
  return data;
};

export const getProductById = (props) => {
  const { data, idProduct } = props;
  let products = null;
  products = _.find(data, { id: idProduct });
  return products;
};

export const getProductSame = (props) => {
  const { dataProduct, idCategory } = props;
  let products = [];
  products = _.filter(dataProduct, {
    categoryInfo: [{ id: idCategory }],
  });
  return products;
};

export const getBanenrHomePage = (props) => {
  const { data, keyName } = props;
  let rsBanner = null;
  if (keyName) {
    const banner = data[keyName];
    if (banner) rsBanner = banner;
  }
  return rsBanner;
};

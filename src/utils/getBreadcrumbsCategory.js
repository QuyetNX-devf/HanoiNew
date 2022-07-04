const getBreadcrumbsCategory = (dataCategoryProduct, categoryId) => {
  let isCategory = null;
  let breadcrumbs = [];
  let poitBreak = false;

  const findBread = (data, nameParent) => {
    let arrNameParent = [...nameParent];
    if (data.children && data.children.length > 0) {
      data.children.some((item) => {
        if (item.id === categoryId) {
          isCategory = item;
          arrNameParent = [...nameParent, { name: item.name, id: item.id }];
          breadcrumbs = [...arrNameParent];
          poitBreak = true;
        }
        if (item.id !== categoryId) {
          arrNameParent = [...nameParent, { name: item.name, id: item.id }];
          findBread(item, arrNameParent);
        }
        return poitBreak;
      });
    }
  };

  dataCategoryProduct.some((item) => {
    if (item.id === categoryId) {
      isCategory = item;
      breadcrumbs.push({ name: item.name, id: item.id });
      poitBreak = true;
    }
    if (item.id !== categoryId) {
      findBread(item, [{ name: item.name, id: item.id }]);
    }
    return poitBreak;
  });

  return { isCategory, breadcrumbs };
};

export default getBreadcrumbsCategory;

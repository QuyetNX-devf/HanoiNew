// lay sp nổi bật theo id danh mục
function getProductCategoryHome(mouse_id) {
  //console.log('kiem tra')
  var params = {
    action_type: "product-list",
    hotType: "",
    category: mouse_id,
    sort: "order",
    show: 12,
    limit: 50,
  };

  Hura.Ajax.get("product", params).then(function (data) {
    console.log(data);
  });
}

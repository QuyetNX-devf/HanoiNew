import * as yup from "yup";
export const validationSchemaCart = yup.object({
  email: yup
    .string()
    .email("Email chưa đúng định dạng")
    .required("Bạn chưa nhập Email"),
  phone: yup
    .string()
    .min(8, "Bình luận quá ngắn")
    .required("Bạn chưa nhập số điện thoại"),
  name: yup.string().min(5, "Tên bạn quá ngắn").required("Bạn chưa nhập tên"),
  city: yup.string().required("Bạn chưa nhập tên tỉnh/thành phố"),
  district: yup.string().required("Bạn chưa nhập tên quận/huyện"),
  ward: yup.string().required("Bạn chưa nhập tên phường/xã, số nhà"),
  nameCompany: yup.string().when("expBillCompany", {
    is: "yes",
    then: yup.string().required("Bạn chưa nhập tên công ty"),
    otherwise: yup.string(),
  }),
  addressCompany: yup.string().when("expBillCompany", {
    is: "yes",
    then: yup.string().required("Bạn chưa nhập địa chỉ công ty"),
    otherwise: yup.string(),
  }),
  texCodeCompany: yup.string().when("expBillCompany", {
    is: "yes",
    then: yup.string().required("Bạn chưa nhập mã số thuế công ty"),
    otherwise: yup.string(),
  }),
});

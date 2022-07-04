import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PrintIcon from "@mui/icons-material/Print";
import CheckIcon from "@mui/icons-material/Check";
import Breadcrumb from "component/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "utils/formatNumBerPrice";
import { useEffect, useState } from "react";
import { makeStyles, styled } from "@mui/styles";
import axios from "axios";
import ProductInCart from "./componentCart/ProductInCart";
import { useFormik } from "formik";

import "./index.scss";
import { validationSchemaCart } from "validations/validationSchema";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: "none",
  background: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    display: "block",
    padding: 0,
    minHeight: "auto",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      display: "block",
      margin: 0,
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}));

const useStyles = makeStyles((theme) => ({
  wrapCart: {
    background: theme.backgroundColor.primary,
  },
  btn: {
    background: theme.palette.primary.main,
  },
  colorText: {
    color: theme.colorText.secondary,
  },
  customAccordionSummary: {
    "& .MuiAccordionSummary-content": {
      display: "block",
    },
    "& .Mui-expanded": {
      minHeight: "auto",
      margin: 0,
      marginBottom: "5px",
    },
    padding: "0 10px 0",
    height: "auto !important",
    minHeight: "auto !important",
  },
  titleCol: {
    background: theme.backgroundColor.secondary,
  },
  fieldIp: {
    "& .MuiOutlinedInput-root": {
      background: theme.backgroundColor.blackWhite2,
      color: theme.colorText.primary,
    },
    "& .MuiInputLabel-root": {
      color: theme.colorText.primary,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c1c1c1",
    },
  },
  fieldIpSelect: {
    "& .MuiInputLabel-root": {
      color: theme.colorText.primary,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c1c1c1",
    },
    "& .MuiSelect-select": {
      color: theme.colorText.primary,
    },
    "& .MuiSvgIcon-root": {
      color: theme.colorText.primary,
    },
  },
}));

export default function Cart() {
  const classess = useStyles();
  const dataCart = useSelector((state) => state.cart);

  const [city, setCity] = useState("");
  const [districts, setDistricts] = useState("");
  const [expBillCompany, setExpBillCompany] = useState("no");
  const [billAccordion, setBillAccordion] = useState(false);
  const [payMethodAccordion, setPayMethodAccordion] = useState(false);
  const [dataCity, setDataCity] = useState([]);
  const [dataDistricts, setDataDistricts] = useState([]);

  const handleChangeCity = (event, formik) => {
    formik.setFieldValue("city", event.target.value);
    formik.setFieldValue("district", "");
    setCity(event.target.value);
    setDistricts("");
  };

  const handleChangeDistricts = (event, formik) => {
    formik.setFieldValue("district", event.target.value);
    setDistricts(event.target.value);
  };

  const handleChangeBillAccordion = (panel, e, formik) => {
    const value = e.target.value;
    setExpBillCompany(value === "no" ? "yes" : "no");
    formik.setFieldValue("expBillCompany", `${value === "no" ? "yes" : "no"}`);
    if (value === "yes") {
      formik.setFieldValue("nameCompany", "");
      formik.setFieldValue("addressCompany", "");
      formik.setFieldValue("texCodeCompany", "");
    }
    setBillAccordion(panel === billAccordion ? false : panel);
  };
  const handleChangePayMethodAccordion = (panel) => {
    setPayMethodAccordion(panel === payMethodAccordion ? false : panel);
  };

  useEffect(() => {
    const getApiCity = async () => {
      try {
        const res = await axios.get("https://provinces.open-api.vn/api/p/");
        return res;
      } catch (error) {
        console.log(error);
      }
    };
    const data = getApiCity();
    data.then((res) => setDataCity(res.data));
  }, []);

  useEffect(() => {
    if (city !== "") {
      const getApiDistricts = async () => {
        try {
          const res = await axios.get(
            `https://provinces.open-api.vn/api/p/${city}?depth=2`
          );
          return res;
        } catch (error) {
          console.log(error);
        }
      };
      const data = getApiDistricts();
      data.then((res) => setDataDistricts(res.data.districts));
    }
  }, [city]);

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      name: "",
      city: city,
      district: districts,
      ward: "",
      note: "",
      expBillCompany: expBillCompany,
      nameCompany: "",
      addressCompany: "",
      texCodeCompany: "",
      payMethod: "Thanh toán khi nhận hàng",
    },
    validationSchema: validationSchemaCart,
    onSubmit: (values) => {
      let infoCart = {
        ...values,
        cart: dataCart,
      };
      console.log(infoCart);
    },
  });
  return (
    <Box className="main-cart">
      <Breadcrumb path="gio-hang" namePage="giỏ hàng" />
      <Box className="wrap-label">
        <ProductInCart />
        <form onSubmit={formik.handleSubmit}>
          <Box className={`wrap-form-cart ${classess.wrapCart}`}>
            <Box className="item-col-form">
              <Typography
                variant="h7"
                component={"div"}
                className={`title-col ${classess.titleCol}`}
              >
                Thông tin người mua
              </Typography>
              <Box className="group-ip">
                <TextField
                  className={classess.fieldIp}
                  id="name"
                  name="name"
                  label="Họ tên"
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%", marginBottom: "15px" }}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                />
                <TextField
                  className={classess.fieldIp}
                  id="phone"
                  label="Số điện thoại"
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%", marginBottom: "15px" }}
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                />
                <TextField
                  className={classess.fieldIp}
                  id="email"
                  label="email"
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%", marginBottom: "15px" }}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />
                <FormControl fullWidth className={classess.fieldIpSelect}>
                  <InputLabel size="small" id="demo-simple-select-label">
                    Tỉnh/Thành phố
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="city"
                    value={city}
                    label="Tỉnh/Thành phố"
                    name="city"
                    size="small"
                    sx={{ marginBottom: "15px" }}
                    onChange={(e) => handleChangeCity(e, formik)}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                  >
                    {dataCity.map((city, index) => (
                      <MenuItem key={index} value={city.code}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth className={classess.fieldIpSelect}>
                  <InputLabel size="small" id="demo-simple-select-label">
                    Quận/ Huyện
                  </InputLabel>
                  <Select
                    className={classess.fieldIp}
                    labelId="districts"
                    id="demo-simple-select"
                    value={districts}
                    label="Quận/ Huyện"
                    size="small"
                    disabled={city === "" ? true : false}
                    sx={{ width: "100%", marginBottom: "15px" }}
                    name="district"
                    onChange={(e) => handleChangeDistricts(e, formik)}
                    error={
                      formik.touched.district && Boolean(formik.errors.district)
                    }
                  >
                    {dataDistricts.map((district, index) => (
                      <MenuItem key={index} value={district.name}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  className={classess.fieldIp}
                  id="address"
                  label="Địa chỉ"
                  size="small"
                  sx={{ width: "100%", marginBottom: "15px" }}
                  name="ward"
                  value={formik.values.ward}
                  onChange={formik.handleChange}
                  error={formik.touched.ward && Boolean(formik.errors.ward)}
                />
                <TextField
                  className={classess.fieldIp}
                  id="note"
                  label="Ghi chú"
                  multiline
                  rows={4}
                  sx={{ width: "100%", marginBottom: "15px" }}
                  name="note"
                  value={formik.values.note}
                  onChange={formik.handleChange}
                />
                <Accordion expanded={billAccordion === "panel1"}>
                  <AccordionSummary className={classess.customAccordionSummary}>
                    <FormControlLabel
                      value={expBillCompany}
                      control={
                        <Checkbox size="small" sx={{ color: "#c1c1c1" }} />
                      }
                      label="Xuất hóa đơn công ty"
                      onChange={(e) =>
                        handleChangeBillAccordion("panel1", e, formik)
                      }
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      className={classess.fieldIp}
                      id="nameCompany"
                      label="Tên công ty"
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%", marginBottom: "15px" }}
                      name="nameCompany"
                      value={formik.values.nameCompany}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.nameCompany &&
                        Boolean(formik.errors.nameCompany)
                      }
                    />
                    <TextField
                      className={classess.fieldIp}
                      id="address"
                      label="Địa chỉ"
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%", marginBottom: "15px" }}
                      name="addressCompany"
                      value={formik.values.addressCompany}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.addressCompany &&
                        Boolean(formik.errors.addressCompany)
                      }
                    />
                    <TextField
                      className={classess.fieldIp}
                      id="taxCode"
                      label="Mã số thuế"
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%", marginBottom: "15px" }}
                      name="texCodeCompany"
                      value={formik.values.texCodeCompany}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.texCodeCompany &&
                        Boolean(formik.errors.texCodeCompany)
                      }
                    />
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
            <Box className="item-col-form">
              <Typography
                variant="h7"
                component={"div"}
                className={`title-col ${classess.titleCol}`}
              >
                Phương thức thanh toán
              </Typography>
              <Box className="group-method">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={formik.values.payMethod}
                  name="payMethod"
                  onChange={formik.handleChange}
                >
                  <Accordion expanded={payMethodAccordion === "panel1"}>
                    <AccordionSummary
                      className={classess.customAccordionSummary}
                    >
                      <FormControlLabel
                        value="Thanh toán khi nhận hàng"
                        control={
                          <Radio size="small" sx={{ color: "#c1c1c1" }} />
                        }
                        label="Thanh toán khi nhận hàng"
                        onChange={() =>
                          handleChangePayMethodAccordion("panel1")
                        }
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box className="box-detail">
                        <Typography>
                          Khi nhận hàng, quý khách được kiểm tra hàng trước khi
                          thanh toán
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={payMethodAccordion === "panel2"}>
                    <AccordionSummary
                      className={classess.customAccordionSummary}
                    >
                      <FormControlLabel
                        value="Chuyển khoản"
                        control={
                          <Radio size="small" sx={{ color: "#c1c1c1" }} />
                        }
                        label="Chuyển khoản"
                        onChange={() =>
                          handleChangePayMethodAccordion("panel2")
                        }
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box className="box-detail">
                        <Typography>
                          1. Ngân hàng TMCP Á Châu - PGD Hoàng Cầu (ACB) <br />{" "}
                          + Số TK:223688888 <br /> + Chủ TK: Nguyễn Xuân Quyết
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </RadioGroup>
              </Box>
            </Box>
            <Box className="item-col-form">
              <Typography
                variant="h7"
                component={"div"}
                className={`title-col ${classess.titleCol}`}
              >
                Tổng tiền
              </Typography>
              <Box className="group-total">
                <Box className="item-tex">
                  <Typography>Tổng cộng</Typography>
                  <Typography>{dataCart.summaryCart.totalPrice} đ</Typography>
                </Box>
                <Box className="item-tex">
                  <Typography>Phí vận chuyển</Typography>
                  <Typography> đ</Typography>
                </Box>
                <Box className="item-tex">
                  <Typography variant="h7">Thành tiền</Typography>
                  <Typography variant="h6" sx={{ color: "red" }}>
                    {dataCart.summaryCart.totalPrice} đ
                  </Typography>
                </Box>
              </Box>
              <Box className="group-btn">
                <Box className={`btn ${classess.btn}`}>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className={classess.colorText}
                  >
                    <SvgIcon component={LibraryBooksIcon} /> Tải file excel
                  </Typography>
                </Box>
                <Box className={`btn ${classess.btn}`}>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className={classess.colorText}
                  >
                    <SvgIcon component={PrintIcon} /> In báo giá
                  </Typography>
                </Box>
                <Box component="button" type="submit" className="btn">
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className={classess.colorText}
                  >
                    <SvgIcon component={CheckIcon} /> Đặt mua
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

import {
  Box,
  Button,
  Link,
  SvgIcon,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import Breadcrumb from "component/Breadcrumb";
import { NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HelpIcon from "@mui/icons-material/Help";
import "./index.scss";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { useFormik } from "formik";
import useGlobalState from "Hooks/useGlobalState";
import { useEffect, useState } from "react";
import { ENDPOINT } from "contants/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { setAUTH } from "page/authSlice";
const useStyles = makeStyles((theme) => ({
  titleBox: {
    color: theme.colorText.branding,
  },
  formCtn: {
    background: theme.backgroundColor.blackWhite,
  },
  wrapIp: {
    background: theme.backgroundColor.blackWhite2,
    boxShadow: theme.boxShadow.main,
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
}));
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Email chưa đúng định dạng")
    .required("Bạn chưa nhập Email"),
  password: yup
    .string("Enter your Password")
    .min(8, "Mật khẩu quá ngắn")
    .required("Bạn chưa nhập Mật khẩu"),
  confirmPassword: yup
    .string("Enter your Password")
    .required("Bạn chưa nhập lại Mật khẩu")
    .oneOf([yup.ref("password"), null], "Nhập lại mật khẩu chưa đúng"),
  name: yup
    .string("Enter your comment")
    .min(5, "Tên bạn quá ngắn")
    .required("Bạn chưa nhập tên"),
  phone: yup
    .string("Enter your phone")
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      "Bạn chưa nhập đúng định dạng số điện thoại"
    )
    .required("Bạn chưa nhập số điện thoại"),
  address: yup
    .string("Enter your comment")
    .min(10, "Bạn chưa nhập đúng địa chỉ")
    .required("Bạn chưa nhập địa chỉ"),
});

export default function Register() {
  const authState = useSelector((state) => state.authLogin);
  const { isAuthenticated, user } = authState;
  const dispatch = useDispatch();

  const classes = useStyles();
  const isSmallerScreen = useMediaQuery("(max-width: 768px)");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const register = {
        account: values.email,
        password: values.password,
        userName: values.name,
        phone: values.phone,
        address: values.address,
      };
      console.log(register);
      userRegister(register);
    },
  });

  const userRegister = async (payload) => {
    try {
      setLoading(true);
      const res = await axios.post(`${ENDPOINT}/auth/register`, payload);
      if (res.data.success) {
        setError(null);
        localStorage.setItem("auth_token", res.data.accessToken);
        dispatch(
          setAUTH({
            isAuthenticated: true,
            user: null,
          })
        );
        navigate("/account");
      }
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      } else {
        setError("An error occurred, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="page-login">
      <Breadcrumb path="dang-ky" namePage="Đăng ký" />
      <Box className="wrap-label">
        <Box className={`container-form ${classes.formCtn}`}>
          <Box className="form-user">
            <Box className="form-user__header">
              <Box className="form-user__header--title"></Box>
              <Link
                className="form-user__header--dangky"
                to="#"
                component={NavLink}
              >
                <Typography>
                  Nếu bạn chưa có tài khoản vui lòng{" "}
                  <span>Đăng ký tài khoản</span>
                </Typography>
              </Link>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Box className={`cont_form ${classes.wrapIp}`}>
                <Box className="cont_form--left">
                  <Box className={`cont_form__title ${classes.titleBox}`}>
                    1. Thông tin đăng nhập
                  </Box>
                  <Box className="form-login">
                    <Typography className="text" sx={{ marginBottom: "10px" }}>
                      Đây là những thông tin bắt buộc để tạo tài khoản. Vui lòng
                      điền đầy đủ và chính xác
                    </Typography>
                    <TextField
                      className={classes.fieldIp}
                      id="email"
                      name="email"
                      label="Email"
                      size={"small"}
                      variant="outlined"
                      sx={{ width: "100%", marginBottom: "15px" }}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                      className={classes.fieldIp}
                      id="password"
                      label="Mật khẩu"
                      name="password"
                      type="password"
                      variant="outlined"
                      size={"small"}
                      sx={{ width: "100%", marginBottom: "15px" }}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                    <TextField
                      className={classes.fieldIp}
                      id="confirmPassword"
                      label="Nhập lại mật khẩu"
                      name="confirmPassword"
                      type="password"
                      variant="outlined"
                      size={"small"}
                      sx={{ width: "100%", marginBottom: "15px" }}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                    />
                    {error && (
                      <Box className="showError">
                        <ReportGmailerrorredIcon fontSize="small" />
                        {error}
                      </Box>
                    )}
                    {isSmallerScreen ? (
                      ""
                    ) : (
                      <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<HowToRegIcon />}
                        type="submit"
                        variant="contained"
                        size="small"
                        sx={{
                          fontSize: "14px !important",
                          "&.Mui-disabled": {
                            backgroundColor: "white",
                            color: "#000000a1",
                          },
                        }}
                      >
                        Đăng ký
                      </LoadingButton>
                    )}
                  </Box>
                </Box>
                <Box className="cont_form--right">
                  <Box className={`cont_form__title ${classes.titleBox}`}>
                    2. Thông tin cá nhân
                  </Box>
                  <Typography className="text" sx={{ marginBottom: "10px" }}>
                    Đây là thông tin khi bạn mua hàng, bạn có thể cập nhật sau
                    kho đăng ký tài khoản thành công
                  </Typography>
                  <TextField
                    className={classes.fieldIp}
                    id="name"
                    name="name"
                    label="Họ tên"
                    size={"small"}
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: "15px" }}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                    className={classes.fieldIp}
                    id="phone"
                    label="Số điện thoại"
                    name="phone"
                    type="number"
                    variant="outlined"
                    size={"small"}
                    sx={{ width: "100%", marginBottom: "15px" }}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                  <TextField
                    className={classes.fieldIp}
                    id="address"
                    label="Địa chỉ"
                    name="address"
                    variant="outlined"
                    size={"small"}
                    sx={{ width: "100%", marginBottom: "15px" }}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />
                  {isSmallerScreen && (
                    <Button type="submit" variant="contained" size="small">
                      Đăng ký
                    </Button>
                  )}
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

import {
  Box,
  Button,
  Link,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Breadcrumb from "component/Breadcrumb";
import { NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HelpIcon from "@mui/icons-material/Help";
import SendIcon from "@mui/icons-material/Send";
import "./index.scss";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { ENDPOINT } from "contants/api";
import useGlobalState from "Hooks/useGlobalState";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import axios from "axios";
import UseAuthUser from "Hooks/useAuthUser";
import LoginIcon from "@mui/icons-material/Login";
import { setAUTH } from "page/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  titleBox: {
    color: theme.palette.secondary.main,
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
});
export default function Login() {
  const classes = useStyles();
  const authState = useSelector((state) => state.authLogin);
  const { isAuthenticated, user } = authState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const register = {
        account: values.email,
        password: values.password,
      };
      console.log(register);
      login(register);
      // resetForm();
    },
  });

  const login = async (payload) => {
    try {
      setLoading(true);
      const res = await axios.post(`${ENDPOINT}/auth/login`, payload);
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
      <Breadcrumb path="dang-nhap" namePage="Đăng nhập" />
      <Box className="wrap-label">
        <Box className={`container-form ${classes.formCtn}`}>
          <Box className="form-user">
            <Box className="form-user__header">
              <Box className="form-user__header--title"></Box>
              <Link
                className="form-user__header--dangky"
                to="/dang-ky"
                component={NavLink}
              >
                <Typography>
                  Nếu bạn chưa có tài khoản vui lòng{" "}
                  <span>Đăng ký tài khoản</span>
                </Typography>
              </Link>
            </Box>
            <Box className={`cont_form ${classes.wrapIp}`}>
              <Box className="cont_form--left">
                <Box className={`cont_form__title ${classes.titleBox}`}>
                  <SvgIcon component={PersonIcon} /> Đăng nhập bằng email đã
                  đăng ký
                </Box>
                <Box className="form-login">
                  <form onSubmit={formik.handleSubmit}>
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
                      name="password"
                      label="Mật khẩu"
                      variant="outlined"
                      type={"password"}
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
                    {error && (
                      <Box className="showError">
                        <ReportGmailerrorredIcon fontSize="small" />
                        {error}
                      </Box>
                    )}
                    <LoadingButton
                      loading={loading}
                      loadingPosition="start"
                      startIcon={<LoginIcon />}
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
                      Đăng nhập
                    </LoadingButton>
                  </form>
                </Box>
              </Box>
              <Box className="cont_form--right">
                <Box className={`cont_form__title ${classes.titleBox}`}>
                  <SvgIcon component={HelpIcon} /> Đăng nhập bằng email đã đăng
                  ký
                </Box>
                <Typography className="text" sx={{ marginBottom: "10px" }}>
                  Đăng nhập để theo giỏi thông tin đơn hàng của bạn
                </Typography>
                <Typography className="text">
                  Nếu bạn gặp khó khăn trong lúc đang ký thì xin vui lòng liên
                  hệ tới số 0988888888 hoặc SMS tới để được hộ trợ
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

import {
  Box,
  Button,
  Link,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import Breadcrumb from "component/Breadcrumb";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HelpIcon from "@mui/icons-material/Help";
import "./index.scss";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { useFormik } from "formik";
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
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const register = {
        email: values.email,
        password: values.password,
      };
      console.log(register);
      // resetForm();
    },
  });
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
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      sx={{ fontSize: "14px !important" }}
                    >
                      Đăng nhập
                    </Button>
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

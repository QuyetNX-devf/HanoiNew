import { Box, TextField, Typography } from "@mui/material";
import LayoutAccount from "component/LayoutAccount";
import useGlobalState from "Hooks/useGlobalState";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import "./index.scss";
import { useDispatch } from "react-redux";
import { setAUTH } from "page/authSlice";
import { ENDPOINT } from "contants/api";
import axios from "axios";

const validationSchema = yup.object({
  oldPassword: yup
    .string("Enter your Password")
    .required("Bạn chưa nhập Mật khẩu"),
  newPassword: yup
    .string("Enter your Password")
    .min(8, "Mật khẩu quá ngắn")
    .required("Bạn chưa nhập mật khẩu mới"),
  confirmNewPassword: yup
    .string("Enter your Password")
    .required("Bạn chưa nhập lại Mật khẩu mới")
    .oneOf([yup.ref("newPassword"), null], "Nhập lại mật khẩu chưa đúng"),
});

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

export default function ChangePassword() {
  const classes = useStyles();
  const authState = useSelector((state) => state.authLogin);
  const { authLoading, isAuthenticated, user } = authState;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    // enableReinitialze: true,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const update = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      console.log(update, "check update password");
      changePassword(update);
    },
  });

  const changePassword = async (payload) => {
    try {
      setLoading(true);
      const res = await axios.put(`${ENDPOINT}/account`, payload);
      if (res.data.success) {
        setError(null);
        console.log(res.data, "check res");
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
    <Box className="page-profile">
      <LayoutAccount>
        <Box className="wrap-profile">
          <Typography className="title-info">Thông tin tài khoản</Typography>
          <Box className="wrap-form">
            <form onSubmit={formik.handleSubmit}>
              <Box className="item-ip">
                <Typography className="title-ip">
                  Mật khẩu hiện tại:{" "}
                </Typography>
                <Box className="left-ip">
                  <TextField
                    className={classes.fieldIp}
                    id="oldPassword"
                    name="oldPassword"
                    // label="Email"
                    size={"small"}
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: "15px" }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.oldPassword &&
                      Boolean(formik.errors.oldPassword)
                    }
                    helperText={
                      formik.touched.oldPassword && formik.errors.oldPassword
                    }
                  />
                </Box>
              </Box>
              <Box className="item-ip">
                <Typography className="title-ip">Mật khẩu mới: </Typography>
                <Box className="left-ip">
                  <TextField
                    className={classes.fieldIp}
                    id="newPassword"
                    name="newPassword"
                    // label="Họ tên"
                    size={"small"}
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: "15px" }}
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.newPassword &&
                      Boolean(formik.errors.newPassword)
                    }
                    helperText={
                      formik.touched.newPassword && formik.errors.newPassword
                    }
                  />
                </Box>
              </Box>
              <Box className="item-ip">
                <Typography className="title-ip">
                  Nhập lại mật khẩu mới:{" "}
                </Typography>
                <Box className="left-ip">
                  <TextField
                    className={classes.fieldIp}
                    id="confir"
                    // label="Số điện thoại"
                    name="confirmNewPassword"
                    // type="number"
                    variant="outlined"
                    size={"small"}
                    sx={{ width: "100%", marginBottom: "15px" }}
                    value={formik.values.confirmNewPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmNewPassword &&
                      Boolean(formik.errors.confirmNewPassword)
                    }
                    helperText={
                      formik.touched.confirmNewPassword &&
                      formik.errors.confirmNewPassword
                    }
                  />
                </Box>
              </Box>
              {error && (
                <Box className="showError">
                  <ReportGmailerrorredIcon fontSize="small" />
                  {error}
                </Box>
              )}
              <LoadingButton
                loading={loading}
                loadingPosition="start"
                startIcon={<PublishedWithChangesIcon />}
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
                Lưu thay đổi
              </LoadingButton>
            </form>
          </Box>
        </Box>
      </LayoutAccount>
    </Box>
  );
}

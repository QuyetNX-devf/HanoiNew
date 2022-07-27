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
  email: yup
    .string("Enter your email")
    .email("Email chưa đúng định dạng")
    .required("Bạn chưa nhập Email"),
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

export default function Account() {
  const [field, setField] = useState({
    userName: "",
    address: "",
    phone: "",
    email: "",
  });
  const classes = useStyles();
  const authState = useSelector((state) => state.authLogin);
  const { authLoading, isAuthenticated, user } = authState;
  const { userName, address, phone, email } = field;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setField({
        userName: user.userName,
        address: user.address,
        phone: user.phone,
        email: user.email,
      });
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      email: email,
      name: userName,
      phone: phone,
      address: address,
    },
    // enableReinitialze: true,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const update = {
        email: values.email,
        userName: values.name,
        phone: values.phone,
        address: values.address,
      };
      // console.log(register);
      updateUser(update);
    },
  });

  const updateUser = async (payload) => {
    try {
      setLoading(true);
      const res = await axios.put(`${ENDPOINT}/account`, payload);
      if (res.data.success) {
        setError(null);
        console.log(res.data, "check res");
        dispatch(
          setAUTH({
            isAuthenticated: true,
            user: res.data.user,
          })
        );
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
                <Typography className="title-ip">Email: </Typography>
                <Box className="left-ip">
                  <TextField
                    className={classes.fieldIp}
                    id="email"
                    name="email"
                    // label="Email"
                    size={"small"}
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: "15px" }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Box>
              </Box>
              <Box className="item-ip">
                <Typography className="title-ip">Họ tên: </Typography>
                <Box className="left-ip">
                  <TextField
                    className={classes.fieldIp}
                    id="name"
                    name="name"
                    // label="Họ tên"
                    size={"small"}
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: "15px" }}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Box>
              </Box>
              <Box className="item-ip">
                <Typography className="title-ip">Số điện thoại: </Typography>
                <Box className="left-ip">
                  <TextField
                    className={classes.fieldIp}
                    id="phone"
                    // label="Số điện thoại"
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
                </Box>
              </Box>
              <Box className="item-ip">
                <Typography className="title-ip">Địa chỉ: </Typography>
                <Box className="left-ip">
                  <TextField
                    className={classes.fieldIp}
                    id="address"
                    // label="Địa chỉ"
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

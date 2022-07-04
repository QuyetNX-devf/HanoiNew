import { Box, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FormHelperText } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { addReview } from "page/rateSlice";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styled from "@emotion/styled";
import { makeStyles } from "@mui/styles";

const labels = {
  1: "Useless+",
  2: "Poor+",
  3: "Ok+",
  4: "Good+",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Email chưa đúng định dạng")
    .required("Bạn chưa nhập Email"),
  comment: yup
    .string("Enter your comment")
    .min(8, "Bình luận quá ngắn")
    .required("Bạn chưa nhập nội dung bình luận"),
  name: yup
    .string("Enter your comment")
    .min(5, "Tên bạn quá ngắn")
    .required("Bạn chưa nhập tên"),
  vote: yup.string().nullable().required("Bạn chưa chọn sao"),
});

const CustomButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.warning.main,
  color: theme.palette.common.white,
  fontSize: "14px !important",
  "&:hover": {
    backgroundColor: theme.palette.warning.dark,
  },
}));

const CustomButtonLight = styled((props) => <Button {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontSize: "14px !important",
    padding: "5px 25px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const useStyles = makeStyles((theme) => ({
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
  rating: {
    "& .MuiRating-iconEmpty": {
      color: "rgb(137 137 137);",
    },
  },
}));

export default function ClientReview({ idProduct, handleExpanded }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [valueStar, setValueStar] = useState(4);
  const [hover, setHover] = useState(-1);

  const formik = useFormik({
    initialValues: {
      email: "",
      comment: "",
      name: "",
      vote: valueStar,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      var date = new Date().getTime();
      let itemRate = {
        id: _.uniqueId(),
        item_type: "product",
        idProduct: parseInt(idProduct),
        people_like_count: "0",
        people_dislike_count: "0",
        reply_count: "0",
        is_user_admin: "0",
        user_avatar: "",
        user_name: values.name,
        rate: `${values.vote}`,
        title: "",
        content: values.comment,
        files: [],
        approved: "0",
        post_time: date,
        counter: 1,
        replies: [],
      };
      let action = addReview(itemRate);
      console.log(itemRate);
      dispatch(action);
      resetForm();
    },
  });

  return (
    <Box className="client-review">
      <Typography marginBottom={"25px"} className="h-product">
        Gửi nhận xét của bạn:
      </Typography>
      <Box className="form-rv">
        <form onSubmit={formik.handleSubmit}>
          <Box marginBottom={"25px"}>
            <TextField
              className={classes.fieldIp}
              id="comment"
              name="comment"
              label="Mời bạn đánh giá"
              multiline
              rows={5}
              size={"small"}
              placeholder="Vui lòng nhập chữ có dấu"
              sx={{ width: "100%" }}
              value={formik.values.comment}
              onChange={formik.handleChange}
              error={formik.touched.comment && Boolean(formik.errors.comment)}
              helperText={formik.touched.comment && formik.errors.comment}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: {
                xs: "15px",
                sm: "25px",
              },
            }}
          >
            <Rating
              name="vote"
              size="small"
              value={valueStar}
              precision={1}
              className={classes.rating}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                formik.setFieldValue("vote", newValue);
                setValueStar(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />

            {valueStar !== null ? (
              <Typography sx={{ ml: 2 }}>
                {labels[hover !== -1 ? hover : valueStar]}
              </Typography>
            ) : (
              <FormHelperText error>{formik.errors.vote}</FormHelperText>
            )}
          </Box>

          <Box
            sx={{
              marginBottom: {
                xs: "15px",
                sm: "25px",
              },
            }}
          >
            <TextField
              className={classes.fieldIp}
              id="name"
              name="name"
              label="Tên bạn"
              sx={{
                width: {
                  xs: "100%",
                  sm: "450px",
                },
              }}
              size={"small"}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Box>
          <Box
            sx={{
              marginBottom: {
                xs: "15px",
                sm: "25px",
              },
            }}
          >
            <TextField
              className={classes.fieldIp}
              id="email"
              name="email"
              label="Email"
              sx={{
                width: {
                  xs: "100%",
                  sm: "450px",
                },
              }}
              size={"small"}
              type={"email"}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box>
            <Stack direction={"row"} spacing={"12px"}>
              <CustomButtonLight size="small" disableElevation type="submit">
                Gửi đánh giá
              </CustomButtonLight>

              <CustomButton
                size="small"
                variant="contained"
                endIcon={<CloseOutlinedIcon />}
                background={"error"}
                onClick={() => handleExpanded("panel1")}
              >
                Đóng
              </CustomButton>
            </Stack>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

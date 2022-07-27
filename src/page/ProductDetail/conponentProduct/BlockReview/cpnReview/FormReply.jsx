import { Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { replyReview } from "page/rateSlice";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import * as yup from "yup";
import styled from "@emotion/styled";
import { makeStyles } from "@mui/styles";
import { replyRate } from "contants/api";
import { useMutation, useQueryClient } from "react-query";

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
}));

export default function FormReply({ idReview, handleChangeExpanded }) {
  const user = useSelector((state) => state.authLogin.user);
  const classes = useStyles();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const reply = useMutation((data) => replyRate(data), {
    onSuccess: (data) => {
      console.log(data);
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        predicate: (query) => query.queryHash.startsWith('["/rate"'),
      }),
  });

  const formik = useFormik({
    initialValues: {
      email: user ? user.email : "",
      comment: "",
      name: user ? user.userName : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const date = new Date().getTime();
      const itemReply = {
        id: _.uniqueId(),
        idRate: idReview,
        item_type: "product",
        idProduct: "",
        people_like_count: "0",
        people_dislike_count: "0",
        reply_count: "0",
        is_user_admin: "1",
        user_avatar: "",
        user_name: values.name,
        rate: "5",
        title: "",
        content: values.comment,
        files: [],
        approved: "0",
        post_time: date,
        counter: 1,
      };

      // let action = replyReview({ idReview: idReview, reply: itemReply });
      // dispatch(action);
      reply.mutate(itemReply);
      resetForm();
    },
  });
  return (
    <Box className="wrap-form-item-review">
      <form onSubmit={formik.handleSubmit}>
        <Box marginBottom={"15px"}>
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
          />
        </Box>
        <Stack direction={"row"} spacing={"12px"}>
          <Box marginBottom={"15px"}>
            <TextField
              className={classes.fieldIp}
              id="name"
              name="name"
              label="Tên bạn"
              sx={{ width: "100%" }}
              size={"small"}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
          </Box>
          <Box marginBottom={"15px"}>
            <TextField
              className={classes.fieldIp}
              id="email"
              name="email"
              label="Email"
              sx={{ width: "100%" }}
              size={"small"}
              type={"email"}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
          </Box>
        </Stack>
        <Box>
          <Stack direction={"row"} spacing={"12px"}>
            <CustomButtonLight size="small" disableElevation type="submit">
              Gửi
            </CustomButtonLight>

            <CustomButton
              size="small"
              variant="contained"
              background={"error"}
              onClick={() => handleChangeExpanded(idReview)}
            >
              Đóng
            </CustomButton>
          </Stack>
        </Box>
      </form>
    </Box>
  );
}

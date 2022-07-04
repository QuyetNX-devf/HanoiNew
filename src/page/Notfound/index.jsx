import { Box, Typography } from "@mui/material";

function Notfound() {
  return (
    <Box className="notFound" sx={{ padding: "40px 0" }}>
      <Box className="wrap-label">
        <Typography variant="h1" component={"h1"}>
          Notfound...
        </Typography>
        <Typography variant="h6" component={"p"}>
          Rât tiếc! trang bạn tìm không tồn tai. Vui lòng liên hệ
          Cskh@quetycomputer.com.vn
        </Typography>
      </Box>
    </Box>
  );
}
export default Notfound;

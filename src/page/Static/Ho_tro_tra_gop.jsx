import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Breadcrumb from "component/Breadcrumb";
import LoremText from "component/LoremText";
import "./Styles.scss";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  bg1: {
    background: theme.backgroundColor.blackWhite,
  },
  bg2: {
    background: theme.backgroundColor.blackWhite2,
  },
}));

export default function Ho_tro_tra_gop() {
  const classes = useStyles();
  return (
    <Box className="page-static">
      <Breadcrumb path="ho-tro-tra-gop.html" namePage="Hỗ trợ trả góp" />
      <Box className="wrap-label">
        <Box className={`wrap-container-static ${classes.bg1}`}>
          <Typography className="title-static" variant="h1">
            Hỗ trợ trả góp
          </Typography>
          <Box className="mg-static">
            <LoremText />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

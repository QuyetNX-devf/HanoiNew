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

export default function Bao_hanh_tan_nha() {
  const classes = useStyles();

  return (
    <Box className="page-static">
      <Breadcrumb path="bao-hanh-tan-nha.html" namePage="Bảo hành tận nhà" />
      <Box className="wrap-label">
        <Box className={`wrap-container-static ${classes.bg1}`}>
          <Typography className="title-static" variant="h1">
            Bảo hành tận nhà
          </Typography>
          <Box className="mg-static">
            <LoremText />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

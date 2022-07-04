import {
  Box,
  Typography,
  AccordionSummary,
  Accordion,
  Grid,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ClientReview from "./cpnReview/ClientReview";
import { useState } from "react";

const Accordionct = styled((props) => (
  <Accordion disableGutters={true} elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "transparent",
}));
const AccordionSummaryct = styled(AccordionSummary)(({ theme }) => ({
  padding: 0,
  "& .MuiAccordionSummary-content": {
    display: "block",
  },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}));

const CustomButtonLight = styled((props) => <Button {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: "5px 41px",
    fontSize: "17px !important",
    [theme.breakpoints.down("md")]: {
      padding: "5px 10px",
      fontSize: "14px !important",
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const useStyles = makeStyles((theme) => ({
  backgroundColor: {
    background: theme.backgroundColor.primary,
  },
  textColor: {
    color: theme.palette.secondary.main,
  },
  wrapRiview: {
    border: theme.border.main,
  },
}));

export default function BlockReview({ idProduct, rateStart }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpanded = (panel) => {
    setExpanded(panel === expanded ? false : panel);
  };
  return (
    <Box className={`block-review`}>
      <Accordionct expanded={expanded === "panel1"}>
        <AccordionSummaryct>
          <Typography className="h-product" sx={{ margin: "20px 0 15px" }}>
            Khách hàng chấm điểm, đánh giá, nhận xét
          </Typography>
          <Box className={`wrap-rv ${classes.wrapRiview}`}>
            <Grid container>
              <Grid item xs={12} sm={3} md={4}>
                <Box className="rv-left">
                  <Box className="rv-left--poit">
                    <Typography
                      variant="h2"
                      className={`score ${classes.textColor}`}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {rateStart.averageRate.toFixed(1)}/5
                      <StarIcon sx={{ fontSize: "38px" }} />
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="rv-center">
                  <Box className="rv__center_item">
                    <Typography className="item_left">5 sao</Typography>
                    <Box className="item_center">
                      <Box
                        sx={{
                          width: rateStart.rate5 > 0 ? "100% !important" : 0,
                        }}
                        component={"span"}
                      ></Box>
                    </Box>
                    <Typography className="item_right">
                      {rateStart.rate5}
                    </Typography>
                  </Box>
                  <Box className="rv__center_item">
                    <Typography className="item_left">4 sao</Typography>
                    <Box className="item_center">
                      <Box
                        sx={{
                          width: rateStart.rate4 > 0 ? "100% !important" : 0,
                        }}
                        component={"span"}
                      ></Box>
                    </Box>
                    <Typography className="item_right">
                      {rateStart.rate4}
                    </Typography>
                  </Box>
                  <Box className="rv__center_item">
                    <Typography className="item_left">3 sao</Typography>
                    <Box className="item_center">
                      <Box
                        sx={{
                          width: rateStart.rate3 > 0 ? "100% !important" : 0,
                        }}
                        component={"span"}
                      ></Box>
                    </Box>
                    <Typography className="item_right">
                      {rateStart.rate3}
                    </Typography>
                  </Box>
                  <Box className="rv__center_item">
                    <Typography className="item_left">2 sao</Typography>
                    <Box className="item_center">
                      <Box
                        sx={{
                          width: rateStart.rate2 > 0 ? "100% !important" : 0,
                        }}
                        component={"span"}
                      ></Box>
                    </Box>
                    <Typography className="item_right">
                      {rateStart.rate2}
                    </Typography>
                  </Box>
                  <Box className="rv__center_item">
                    <Typography className="item_left">1 sao</Typography>
                    <Box className="item_center">
                      <Box
                        sx={{
                          width: rateStart.rate1 > 0 ? "100% !important" : 0,
                        }}
                        component={"span"}
                      ></Box>
                    </Box>
                    <Typography className="item_right">
                      {rateStart.rate1}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3} md={4}>
                <Box className="rv-right">
                  <Typography variant="h7" marginBottom={"10px"}>
                    Bạn đã dùng sản phẩm này ?
                  </Typography>
                  <CustomButtonLight
                    size="small"
                    variant="contained"
                    disableElevation
                    onClick={() => handleExpanded("panel1")}
                  >
                    Viết bình luận
                  </CustomButtonLight>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </AccordionSummaryct>
        <AccordionDetails>
          <ClientReview idProduct={idProduct} handleExpanded={handleExpanded} />
        </AccordionDetails>
      </Accordionct>
    </Box>
  );
}

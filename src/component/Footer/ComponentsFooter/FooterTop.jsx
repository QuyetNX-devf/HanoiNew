import { Box, Grid, InputBase, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  Search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
  },
  SearchIconWrap: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: "0",
    right: "0",
    color: theme.palette.secondary.main,
  },
  StyledInputBase: {
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  },
  bgTheme2: {
    background: theme.backgroundColor.secondary,
  },
}));

export default function FooterTop() {
  const classes = useStyles();
  return (
    <Box
      className={`footer-top ${classes.bgTheme2}`}
      sx={{ background: "#f1f1f1", padding: "29px 0" }}
    >
      <Box className="wrap-label">
        <Grid container className="wrap-ct" alignItems="center">
          <Grid item xs={12} md={5}>
            <Box className="left">
              <Typography variant="h5" className="text-title">
                Kênh thông tin
              </Typography>
              <Typography className="text-sub-title">
                Mời bạn nhập thông tin để được nhận thông tin khuyến mãi từ
                Quety Computer
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="right">
              <Box className={classes.Search}>
                <InputBase
                  className={classes.StyledInputBase}
                  placeholder="Search…"
                />
                <Box className={classes.SearchIconWrap}>
                  <SendIcon />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

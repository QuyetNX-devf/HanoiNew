import { Box, Grid, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import BannerSlide from "../BannerSlide";

const useStyles = makeStyles((theme) => ({
  stBanner: {
    display: "block",
    "& img": {
      display: "block",
      width: "100%",
      height: "auto",
    },
  },
  nullLeftBanner: {
    background: "#fff",
    height: "100%",
  },
}));

export default function BannerPc({ dataBanner }) {
  const classes = useStyles();
  return (
    <>
      <Box className="group-banner-1">
        <Grid container spacing={"10px"}>
          <Grid
            item
            xs={12 / 5}
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          >
            <Box className={classes.nullLeftBanner}></Box>
          </Grid>
          <Grid item xs={12} lg={(12 / 5) * 4}>
            <Box sx={{ margin: "10px 0" }}>
              <Grid container spacing={"10px"}>
                <Grid item xs={(12 / 3) * 2}>
                  {dataBanner.bannerSlide.length > 0 && (
                    <BannerSlide data={dataBanner.bannerSlide} />
                  )}
                </Grid>
                <Grid item xs={12 / 3}>
                  {dataBanner.bannerSmall.length > 0 &&
                    dataBanner.bannerSmall.map(
                      (banner, indexBanner) =>
                        indexBanner < 2 && (
                          <Link
                            to={banner.url}
                            component={NavLink}
                            key={indexBanner}
                            className={classes.stBanner}
                            sx={
                              indexBanner === 0
                                ? { marginBottom: "10px" }
                                : { marginBottom: 0 }
                            }
                          >
                            <img src={banner.image} alt={banner.title} />
                          </Link>
                        )
                    )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className="group-banner-2">
        <Grid container spacing={"10px"}>
          <Grid
            item
            xs={12 / 5}
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          >
            <Box className={classes.nullLeftBanner}></Box>
          </Grid>
          <Grid item xs={12} lg={(12 / 5) * 4}>
            <Grid container spacing={"10px"}>
              {dataBanner.bannerSmall.length > 0 &&
                dataBanner.bannerSmall.map(
                  (itemBanner, indexBanner) =>
                    indexBanner > 1 && (
                      <Grid key={indexBanner} item xs={4}>
                        <Link
                          to={itemBanner.url}
                          component={NavLink}
                          className={classes.stBanner}
                        >
                          <img src={itemBanner.image} alt={itemBanner.title} />
                        </Link>
                      </Grid>
                    )
                )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

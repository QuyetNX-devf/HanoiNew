import { Box, Grid, Link, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import { makeStyles } from "@mui/styles";
const dataBox = [
  {
    title: "Khách hàng cá nhân",
    listSupport: [
      {
        icon: <CallIcon fontSize="small" />,
        text: "098.161.8988",
        name: "Mr.Quyết",
        link: "#",
      },
      {
        icon: <CallIcon fontSize="small" />,
        text: "098.161.8988",
        name: "Mr.Quyết",
        link: "#",
      },
      {
        icon: <CallIcon fontSize="small" />,
        text: "098.161.8988",
        name: "Mr.Quyết",
        link: "#",
      },
    ],
  },
  {
    title: "Khách hàng cá nhân",
    listSupport: [
      {
        icon: <CallIcon fontSize="small" />,
        text: "098.161.8988",
        name: "Mr.Quyết",
        link: "#",
      },
      {
        icon: <CallIcon fontSize="small" />,
        text: "098.161.8988",
        name: "Mr.Quyết",
        link: "#",
      },
      {
        icon: <CallIcon fontSize="small" />,
        text: "098.161.8988",
        name: "Mr.Quyết",
        link: "#",
      },
    ],
  },
  {
    title: "Khách hàng cá nhân",
    listSupport: [
      {
        icon: <CallIcon fontSize="small" />,
        text: "098.161.8988",
        name: "Mr.Quyết",
        link: "#",
      },
      {
        icon: <CallIcon fontSize="small" />,
        text: "098.161.8988",
        name: "Mr.Quyết",
        link: "#",
      },
      {
        icon: <CallIcon fontSize="small" />,
        text: "098.161.8988",
        name: "Mr.Quyết",
        link: "#",
      },
    ],
  },
  {
    title: "Khách hàng cá nhân",
    listSupport: [
      {
        icon: <CallIcon fontSize="small" />,
        text: "098.161.8988",
        name: "Mr.Quyết",
        link: "#",
      },
      {
        icon: <CallIcon fontSize="small" />,
        text: "098.161.8988",
        name: "Mr.Quyết",
        link: "#",
      },
      {
        icon: <CallIcon fontSize="small" />,
        text: "098.161.8988",
        name: "Mr.Quyết",
        link: "#",
      },
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  BoxSupport: {
    background: theme.backgroundColor.blackWhite,
  },
  colorTex: {
    color: theme.colorText.primary,
  },
  colorLink: {
    color: theme.colorText.primary,
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
}));

export default function BoxSuport() {
  const classes = useStyles();
  return (
    <>
      <Box className={`BoxSupport ${classes.BoxSupport}`}>
        <Grid container className="item-row" spacing={2}>
          <Grid item xs={3}>
            <Typography component={"div"} className="title-box-support">
              Hỗ trợ trực tuyến
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Grid container className="wrap-contact">
              {dataBox.map((item, index) => (
                <Grid item xs={3} className="item-col" key={index}>
                  <Typography className={`item-col-title ${classes.colorTex}`}>
                    {item.title}
                  </Typography>
                  {item.listSupport.map((item2, index2) => (
                    <Box className={`box-list`} key={index2}>
                      <Link
                        to={item2.link}
                        component={NavLink}
                        className={classes.colorLink}
                      >
                        <span className="icon-link">{item2.icon}</span>
                        <Box
                          component={"span"}
                          className="tel"
                          sx={{
                            color: "red",
                            padding: "0 10px",
                          }}
                        >
                          {item2.text}
                        </Box>
                        <span className="name">{item2.name}</span>
                      </Link>
                    </Box>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

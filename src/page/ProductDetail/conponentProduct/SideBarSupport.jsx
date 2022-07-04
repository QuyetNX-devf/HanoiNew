import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WifiCalling3OutlinedIcon from "@mui/icons-material/WifiCalling3Outlined";
import { Box, Link, Paper, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  serviceRitle: {
    background: theme.palette.secondary.main,
    padding: "15px 10px",
  },
  colorIcon: {
    color: theme.palette.secondary.main,
  },
  blockService: {
    background: theme.backgroundColor.blackWhite2,
  },
}));
export default function SideBarSupport() {
  const classes = useStyles();

  const dataSideBar = [
    {
      title: "Yên tâm mua hàng tại Quety computer",
      type: "pledge",
      children: [
        {
          name: "Sảm phẩm chính hảng 100%",
          url: "#",
          icon: <CheckCircleOutlineIcon />,
        },
        {
          name: "Đổi trả miễn phí lên đến 7 ngày",
          url: "#",
          icon: <QueryBuilderIcon />,
        },
        {
          name: "Mua hàng trả góp lãi suất 0%",
          url: "#",
          icon: <SavingsOutlinedIcon />,
        },
        {
          name: "Bảo hành tận nơi sử dụng",
          url: "#",
          icon: <DescriptionOutlinedIcon />,
        },
        {
          name: "Chính sách vàng cho doanh nghiệp",
          url: "#",
          icon: <ThumbUpAltOutlinedIcon />,
        },
        {
          name: "Vệ sinh máy, hỗ trợ phần mềm chọn đời",
          url: "#",
          icon: <WorkspacePremiumOutlinedIcon />,
        },
        {
          name: "Miễn phí vận chuyển",
          url: "#",
          icon: <LocalShippingOutlinedIcon />,
        },
      ],
    },
    {
      title: "Tư vấn - đặt hàng",
      type: "phoneNumber",
      children: [
        {
          name: "MrQ: 0981618988",
          url: "#",
          icon: <WifiCalling3OutlinedIcon />,
        },
        {
          name: "Sảm phẩm chính hảng 100%",
          url: "#",
          icon: <WifiCalling3OutlinedIcon />,
        },
        {
          name: "Sảm phẩm chính hảng 100%",
          url: "#",
          icon: <WifiCalling3OutlinedIcon />,
        },
      ],
    },
    {
      title: "Trợ giúp",
      type: "support",
      children: [
        {
          name: "Chính sách vận chuyên",
          url: "#",
        },
        {
          name: "Chính sách bảo hành",
          url: "#",
        },
        {
          name: "Chính sách đổi trả hàng",
          url: "#",
        },
        {
          name: "Hướng dẫn mua hàng trả góp",
          url: "#",
        },
      ],
    },
  ];

  return (
    <Box className="service">
      {dataSideBar.map((blockService, index) => (
        <Paper className={`block-service ${classes.blockService}`} key={index}>
          <Typography
            sx={{ color: "white" }}
            variant="h7"
            component={"div"}
            className={`service__title ${classes.serviceRitle}`}
          >
            {blockService.title}
          </Typography>
          <Box className="wrap-list">
            {blockService.children.map((itemService, index2) =>
              blockService.type !== "support" ? (
                blockService.type === "pledge" ? (
                  <Link
                    className="linkSP"
                    key={index2}
                    to={itemService.url}
                    component={NavLink}
                  >
                    <Box
                      className={`icon ${classes.colorIcon}`}
                      component={"span"}
                    >
                      {itemService.icon}
                    </Box>
                    <Box component={"span"}>{itemService.name}</Box>
                  </Link>
                ) : (
                  <Link
                    className="linkSP"
                    key={index2}
                    href={itemService.url}
                    component={"a"}
                  >
                    <Box
                      className={`icon ${classes.colorIcon}`}
                      component={"span"}
                    >
                      {itemService.icon}
                    </Box>
                    <Box component={"span"}>{itemService.name}</Box>
                  </Link>
                )
              ) : (
                <Link
                  className="linkSP"
                  key={index2}
                  to={itemService.url}
                  component={NavLink}
                >
                  {itemService.name}
                </Link>
              )
            )}
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

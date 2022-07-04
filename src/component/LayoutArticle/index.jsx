import { Box, Link, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllCategoryArticle, getArticle } from "utils/category";
import { formatDate, ToSlug } from "utils/format";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import "./index.scss";
import styled from "@emotion/styled";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: "none",
  background: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    display: "block",
    padding: 0,
    minHeight: "auto",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      display: "block",
      margin: 0,
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}));

const useStyles = makeStyles((theme) => ({
  titileLabel: {
    borderBottom: `solid 2px ${theme.palette.secondary.main}`,
    "& .text": {
      background: theme.palette.secondary.main,
      color: theme.colorText.secondary,
      "&::after": {
        background: theme.palette.secondary.main,
      },
    },
  },
  bg: {
    background: theme.backgroundColor.blackWhite,
  },
  navArticle: {
    background: theme.backgroundColor.blackWhite,
    "&::after": {
      background: theme.backgroundColor.blackWhite,
    },
    "&.active": {
      background: theme.palette.primary.main,
      color: theme.colorText.secondary,
      "&::after": {
        background: theme.palette.primary.main,
      },
    },
  },
  wrapList: {
    background: theme.backgroundColor.blackWhite,
  },
}));
export default function LayoutArticle({ children }) {
  const classes = useStyles();
  const isSmallerScreen = useMediaQuery("(max-width: 768px)");
  const dataAllCat = useSelector((state) => state.categoryArticle);
  const dataAticle = useSelector((state) => state.article);

  const [newArticle, setNewArticle] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState([]);
  const [categoryArticle, setCategoryArticle] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const handleChangePanel = (panel) => {
    setExpanded(expanded === panel ? false : panel);
  };

  useEffect(() => {
    const articleNew = getArticle({
      dataArticle: dataAticle,
      type: "new",
    }).data;
    setNewArticle(articleNew);

    const articleFeatured = getArticle({
      dataArticle: dataAticle,
      type: "new",
      limit: 7,
    }).data;
    setFeaturedArticle(articleFeatured);

    const allCategory = getAllCategoryArticle({ data: dataAllCat });
    setCategoryArticle(allCategory);
  }, []);
  return (
    <>
      {isSmallerScreen ? (
        <Box className="nav-mb">
          <Accordion>
            <AccordionSummary onClick={() => handleChangePanel("panel")}>
              <Typography className="nav-title">
                Danh mục tin tức
                <ArrowRightIcon
                  className={`iconRow ${expanded ? "active" : ""}`}
                />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className={`wrap-list ${classes.wrapList}`}>
                {categoryArticle.map((category, index) => (
                  <Link
                    className={`news-tab-item`}
                    key={index}
                    to={`/tin-tuc/danh-muc/${ToSlug(category.title)}-${
                      category.id
                    }.html`}
                    component={NavLink}
                  >
                    {category.title}
                  </Link>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      ) : (
        <Box className="nav-article">
          {categoryArticle.map((category, index) => (
            <Link
              className={`news-tab-item ${classes.navArticle}`}
              key={index}
              to={`/tin-tuc/danh-muc/${ToSlug(category.title)}-${
                category.id
              }.html`}
              component={NavLink}
            >
              {category.title}
            </Link>
          ))}
        </Box>
      )}
      <Box className="wrap-layout">
        <Box className="ct-left">{children}</Box>
        <Box className="ct-right">
          {newArticle.length > 0 && (
            <Box className={`article-new ${classes.bg}`}>
              <Box className={`title-label ${classes.titileLabel}`}>
                <Typography className="text" variant="h5">
                  Tin mới nhất
                </Typography>
              </Box>
              <Box className="list-article-new">
                {newArticle.map((article, index) => (
                  <Link
                    key={index}
                    className="item-article"
                    to={`/tin-tuc/${ToSlug(article.title)}-${article.id}.html`}
                    component={NavLink}
                  >
                    <Box className="item-article-left">{index + 1}</Box>
                    <Typography variant="h7" className="item-article-right">
                      {article.title}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Box>
          )}
          {featuredArticle.length > 0 && (
            <Box className={`article-featured ${classes.bg}`}>
              <Box className={`title-label ${classes.titileLabel}`}>
                <Typography className="text" variant="h5">
                  Tin nổi bật
                </Typography>
              </Box>
              <Box className="list-article-featured">
                {featuredArticle.map((article, index) => (
                  <Link
                    key={index}
                    className="item-article"
                    to={`/tin-tuc/${ToSlug(article.title)}-${article.id}.html`}
                    component={NavLink}
                  >
                    <Box className="img-left">
                      <img src={article.articleDetail.image}></img>
                    </Box>
                    <Box className="text-right">
                      <Typography
                        variant="h6"
                        component={"div"}
                        className="title-news"
                      >
                        {article.title}
                      </Typography>
                      <Typography component={"div"} className="time-news">
                        {formatDate(article.articleDetail.createDate)}
                      </Typography>
                      <Typography
                        component={"div"}
                        className="description-news"
                      >
                        {article.description}
                      </Typography>
                    </Box>
                  </Link>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

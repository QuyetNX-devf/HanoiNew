import {
  Box,
  Grid,
  Link,
  Pagination,
  Slider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, useParams, NavLink } from "react-router-dom";
import _ from "lodash";
import getCategory from "utils/getBreadcrumbsCategory";
import { useEffect, useState } from "react";

import Breadcrumb from "component/Breadcrumb";

import ItemProduct from "component/ItemProduct";
import SliderPrice from "./Component_Cat/SliderPrice";
import SortPrice from "./Component_Cat/SortPrice";
import { sortPrice } from "utils/category";
import "./styles.scss";
import { makeStyles } from "@mui/styles";
import SliderBanner from "./Component_Cat/Slidebanner";
import ArticleFeatured from "page/HomePage/ComponentHome/ArticleFeadtured";
import ContentCategory from "./Component_Cat/ContentCategory";
import LazyLoad from "react-lazyload";
import { ToSlug } from "utils/format";
import PaginationPage from "component/PaginationPage";
import ListProduct from "./Component_Cat/ListProduct";
import FindProductByCategory from "./Component_Cat/FindProductByCategory";
import BannerCategory from "./Component_Cat/BannerCategory";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import styled from "@emotion/styled";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "react-query";
import { getProducts } from "contants/api";

const useStyles = makeStyles((theme) => ({
  wrapLeft: {
    background: theme.backgroundColor.primary,
  },
  borderLabel: {
    borderBottom: `solid 1px ${theme.palette.primary.main}`,
    // [theme.breakpoints.down("mmd")]: {
    //   //1025
    //   borderBottom: "none",
    // },
  },
  titleLeft: {
    color: theme.colorText.changeColorBrand,
    textAlign: "center",
    textTransform: "upperCase",
  },
  wrapListProduct: {
    background: theme.backgroundColor.primary,
    padding: "10px",
    borderRadius: "10px",
  },
  noProduct: {
    background: theme.backgroundColor.blackWhite,
    padding: "50px 0",
    marginTop: "15px",
  },
}));

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

export default function CategoryProduct() {
  const isSmallerScreen = useMediaQuery("(max-width: 1024px)");
  const { categoryId } = useParams();

  const [expanded, setExpanded] = useState(false);
  const handleChangePanel = (value) => {
    setExpanded(value === expanded ? false : value);
  };

  // const BannerCategory = _.filter()

  let params = new URL(document.location).searchParams;
  let maxPrice = params.get("max");
  let minPrice = params.get("min");
  let sttSort = params.get("sort");
  let propsLabel = { maxPrice, minPrice, sttSort };

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
  });

  const [totalPage, setTotalPage] = useState(0);
  const [minMaxPrice, setMinMaxPrice] = useState({ min: 0, max: 0 });

  const [sortPage, setSortpage] = useState({
    page: 1,
    limit: 15,
    totalPage: 0,
    minMaxPrice: {
      min: 0,
      max: 0,
    },
  });

  const paramsApi = {
    maxPrice,
    minPrice,
    sttSort,
    categoryId,
    minMaxPrice: true,
    limit: pagination.limit,
    page: pagination.page,
  };

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["/products", paramsApi],
    queryFn: getProducts,
    keepPreviousData: true,
    retry: false,
  });

  const handleChangePage = (page) => {
    setPagination((prev) => {
      return {
        ...prev,
        page: page,
      };
    });
  };
  useEffect(() => {
    if (data) {
      setTotalPage((prev) => {
        return Math.ceil(data.total / pagination.limit);
      });
      if (data.minMaxPrice) {
        setMinMaxPrice(data.minMaxPrice);
      }
    }
  }, [data?.total]);
  useEffect(() => {
    setPagination((prev) => {
      return {
        ...prev,
        page: 1,
      };
    });
  }, [categoryId]);

  const classes = useStyles();

  return (
    <>
      {error ? (
        <Box className="wrap-label">
          <Box className={classes.noProduct}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {error.message}
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Breadcrumb path={"categoryProduct"} categoryId={categoryId} />
          <Box className="Main-category">
            <Box className="wrap-label">
              <Grid container spacing={"15px"}>
                <Grid item xs={12} mmd={2.5}>
                  <Box className={`wrap-left ${classes.wrapLeft}`}>
                    {isSmallerScreen && (
                      <BannerCategory idCategory={categoryId} />
                    )}
                    <Accordion
                      expanded={isSmallerScreen ? expanded === "panel" : true}
                    >
                      <AccordionSummary>
                        <Box
                          className={`title-filter-label ${classes.borderLabel}`}
                          onClick={() => handleChangePanel("panel")}
                        >
                          <Typography
                            variant="h6"
                            className={`${classes.titleLeft} text-title`}
                          >
                            <FilterAltIcon
                              className="icon-filter"
                              fontSize="small"
                            />
                            Bộ lọc sản phẩm
                          </Typography>
                          <Box
                            className={`icon-more ${
                              expanded === "panel" ? "active" : ""
                            }`}
                          >
                            <ExpandMoreIcon />
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FindProductByCategory categoryId={categoryId} />
                        <Box className="p-filter-item">
                          <Typography component={"div"} className="title-fiter">
                            Lọc giá sản phẩm
                          </Typography>
                          <SliderPrice
                            categoryId={categoryId}
                            minMaxPrice={minMaxPrice}
                          />
                        </Box>
                        <Box className="p-filter-item">
                          <Typography component={"div"} className="title-fiter">
                            Săp xếp:{" "}
                          </Typography>
                          <SortPrice {...propsLabel} />
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Grid>
                <Grid item xs={12} mmd={9.5}>
                  <Box className={"wrap-right"}>
                    {!isSmallerScreen && (
                      <BannerCategory idCategory={categoryId} />
                    )}

                    <Box
                      className={`wrap-list-product ${classes.wrapListProduct}`}
                    >
                      {data?.products &&
                        (data?.products.length > 0 ? (
                          <ListProduct products={data.products} />
                        ) : (
                          <>
                            <Box className={classes.noProduct}>
                              <Typography
                                variant="h5"
                                sx={{ textAlign: "center" }}
                              >
                                Sản phẩm hiện đang cập nhật...
                              </Typography>
                            </Box>
                          </>
                        ))}
                    </Box>
                    {isFetching && isLoading && (
                      <Box className="loading">
                        <Typography>Loading...</Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className="wraper-category-pagination wrap-label">
            <PaginationPage
              handleChangePage={handleChangePage}
              totalRows={totalPage}
            />
          </Box>
          <Box className="content-category">
            <Box className="wrap-label">
              <ContentCategory />
            </Box>
          </Box>
          <ArticleFeatured />
        </>
      )}
    </>
  );
}

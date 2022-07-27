import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import _ from "lodash";

import { useEffect, useState } from "react";

import Breadcrumb from "component/Breadcrumb";

import SliderPrice from "./Component_Cat/SliderPrice";
import SortPrice from "./Component_Cat/SortPrice";
import "./styles.scss";
import { makeStyles } from "@mui/styles";
import ArticleFeatured from "page/HomePage/ComponentHome/ArticleFeadtured";
import PaginationPage from "component/PaginationPage";
import ListProduct from "./Component_Cat/ListProduct";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { getProducts } from "contants/api";
import LoadingPage from "component/Loading/LoadingPage";

const useStyles = makeStyles((theme) => ({
  wrapLeft: {
    background: theme.backgroundColor.primary,
  },
  borderLabel: {
    borderBottom: `solid 1px ${theme.palette.primary.main}`,
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
    background: "#fff",
    padding: "50px 0",
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

export default function PageSearch() {
  const isSmallerScreen = useMediaQuery("(max-width: 1024px)");

  let params = new URL(document.location).searchParams;
  let maxPrice = params.get("max");
  let minPrice = params.get("min");
  let sttSort = params.get("sort");
  let keySearch = params.get("q") ? params.get("q") : "";
  let propsLabel = { maxPrice, minPrice, sttSort, keySearch };

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
  });

  const [totalPage, setTotalPage] = useState(0);

  const [minMaxPrice, setMinMaxPrice] = useState({ min: 0, max: 0 });
  const [expanded, setExpanded] = useState(false);
  const handleChangePanel = (value) => {
    setExpanded(value === expanded ? false : value);
  };

  const paramsApi = {
    maxPrice,
    minPrice,
    sttSort,
    keySearch,
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
    setPagination((prev) => {
      return {
        ...prev,
        page: 1,
      };
    });
  }, [keySearch]);

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

  const classes = useStyles();

  return (
    <>
      {isLoading && <LoadingPage />}
      {data ? (
        <>
          {data.products.length > 0 && (
            <>
              <Breadcrumb path={"tim-kiem.html"} namePage={"Tìm kiếm"} />
              <Box className="Main-category">
                <Box className="wrap-label">
                  <Grid container spacing={"15px"}>
                    <Grid item xs={12} mmd={2.5}>
                      <Box className={`wrap-left ${classes.wrapLeft}`}>
                        <Accordion
                          expanded={
                            isSmallerScreen ? expanded === "panel" : true
                          }
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
                            <Box className="p-filter-item">
                              <Typography
                                component={"div"}
                                className="title-fiter"
                              >
                                Lọc giá sản phẩm
                              </Typography>
                              <SliderPrice minMaxPrice={minMaxPrice} />
                            </Box>
                            <Box className="p-filter-item">
                              <Typography
                                component={"div"}
                                className="title-fiter"
                              >
                                Săp xếp:{" "}
                              </Typography>
                              <SortPrice {...propsLabel} />
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      </Box>
                    </Grid>
                    <Grid item xs={12} mmd={9.5}>
                      <Box
                        className={`wrap-right ${
                          !isLoading && isFetching ? "active-reload" : ""
                        }`}
                      >
                        {!isLoading && isFetching && (
                          <Box className="loading-product">
                            <CircularProgress />
                          </Box>
                        )}
                        <Box
                          className={`wrap-list-product ${classes.wrapListProduct}`}
                        >
                          <ListProduct products={data.products} />
                        </Box>
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
              <ArticleFeatured />
            </>
          )}
          {data.products.length === 0 && (
            <>
              <Breadcrumb path={"tim-kiem.html"} namePage={"Tìm kiếm"} />
              <Box className={classes.noProduct}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Sản phẩm bạn tìm hiện không có...
                </Typography>
              </Box>
            </>
          )}
        </>
      ) : (
        ""
      )}
      ;
    </>
  );
}

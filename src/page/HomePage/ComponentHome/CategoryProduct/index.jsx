import { Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useSelector } from "react-redux";
import _ from "lodash";
import ProductSlide from "../ProductSlide";
import { useEffect, useState } from "react";
import { sortPrice } from "utils/category";
import { ToSlug } from "utils/format";

const useStyles = makeStyles((theme) => ({
  headerNav: {
    borderBottom: `solid 2px ${theme.palette.primary.main}`,
  },
  catLv1: {
    background: theme.palette.primary.main,
  },
  wrapLabel: {
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
  },
  morePd: {
    position: "absolute",
    top: "50%",
    right: "12px",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    color: theme.palette.primary.main,
    "& .icon-next": {
      display: "flex",
      alignItems: "center",
      "& svg": {
        width: "15px",
      },
    },
  },
  bgTheme: {
    background: theme.backgroundColor.primary,
  },
}));

export default function CategoryProduct(props) {
  const products = useSelector((state) => state.product);

  const { dataCat } = props;

  const [resultProduct, setResultProduct] = useState([]);

  useEffect(() => {
    const data = sortPrice({
      listProduct: products,
      categoryId: dataCat.id,
    }).data;
    setResultProduct(data);
  }, []);

  const classes = useStyles();

  return (
    <Box className={"block-pd-by-category"} component={"section"}>
      <Box className={`wrap-label`}>
        <Box className={classes.wrapLabel}>
          <Box className={`header-nav ${classes.headerNav}`}>
            <Box className={`wrap-lis-category ${classes.bgTheme}`}>
              <Link
                to={`danh-muc-san-pham/${ToSlug(dataCat.name)}-${
                  dataCat.id
                }.html`}
                component={NavLink}
                className={`cat-lv1 ${classes.catLv1}`}
              >
                {dataCat.name}
              </Link>
              <Box className={"wrap-cat-lv2"}>
                {dataCat.isParent === 1 &&
                  dataCat.children.map(
                    (catLv2, index) =>
                      index < 4 && (
                        <Link
                          key={index}
                          to={`danh-muc-san-pham/${ToSlug(catLv2.name)}-${
                            catLv2.id
                          }.html`}
                          component={NavLink}
                          className={"cat-lv2"}
                        >
                          {catLv2.name}
                        </Link>
                      )
                  )}
              </Box>
            </Box>
            <Link
              to={`danh-muc-san-pham/${ToSlug(dataCat.name)}-${
                dataCat.id
              }.html`}
              className={`more-pd ${classes.morePd}`}
              component={NavLink}
            >
              <Box component={"span"}>Xem thêm</Box>
              <Box component={"span"} className={"icon-next"}>
                <DoubleArrowIcon />
              </Box>
            </Link>
          </Box>
          <Box className={"wrap-pd"}>
            {resultProduct.length > 0 && <ProductSlide data={resultProduct} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

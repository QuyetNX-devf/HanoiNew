import { Grid } from "@mui/material";
import ItemProduct from "component/ItemProduct";
import Tooltip from "page/HomePage/ComponentHome/Tooltip";
import { memo, useCallback, useState } from "react";
import LazyLoad from "react-lazyload";

function ListProduct({ products }) {
  const Loading = () => (
    <div className="post loading">
      <h5>Loading...</h5>
    </div>
  );

  const initialState = {
    m: {
      top: 0,
      left: 0,
    },
    disp: "none",
    index: 0,
    data: null,
  };

  const [tooltip, setTooltip] = useState(initialState);

  const handleMouseMove = useCallback((e, infoProduct) => {
    setTooltip({
      m: {
        top: e.pageY,
        left: e.pageX + 10,
      },
      disp: "block",
      index: 0,
      data: infoProduct,
    });
  }, []);

  const handleMouseLeave = useCallback((e) => {
    setTooltip({
      ...tooltip,
      disp: "none",
    });
  }, []);

  return (
    <Grid container spacing={"10px"}>
      {products.map((product, index) => (
        <Grid key={index} item xs={6} sm={4} mmd={3} lg={2.4}>
          <LazyLoad placeholder={<Loading />}>
            <ItemProduct
              handleMouseMove={handleMouseMove}
              handleMouseLeave={handleMouseLeave}
              itemData={product}
              cssCategory={"custom"}
            />
          </LazyLoad>
        </Grid>
      ))}
      <Tooltip hovermouse={tooltip} />
    </Grid>
  );
}

export default memo(ListProduct);

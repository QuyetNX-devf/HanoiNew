import { Box, Slider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState, useRef } from "react";

import { formatCurrency } from "utils/formatNumBerPrice";

const useStyles = makeStyles((theme) => ({
  sliderPrice: {
    "& .MuiSlider-markLabel": {
      color: theme.colorText.primary,
    },
  },
}));
export default function SliderPrice(props) {
  const classes = useStyles();
  const { handleChangeFindMaxPrice, minMaxPrice, idCategory } = props;

  let initialValuePrice = [0, minMaxPrice.max];
  const oldMinMaxPrice = useRef();
  const [valuePrice, setValuePrice] = useState(initialValuePrice);

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 25000000,
      label: "25tr",
    },
    {
      value: 50000000,
      label: "50tr",
    },
    {
      value: 75000000,
      label: "75tr",
    },
  ];

  useEffect(() => {
    if (
      JSON.stringify(oldMinMaxPrice.current) !== JSON.stringify(minMaxPrice)
    ) {
      setValuePrice([minMaxPrice.min, minMaxPrice.max]);
      oldMinMaxPrice.current = minMaxPrice;
    }
  }, [minMaxPrice]);

  const handleChange = (event, newValue) => {
    setValuePrice(newValue);
  };

  const valueLabelFormat = (value) => {
    return formatCurrency(value);
  };

  return (
    <Box className="wrap-slide">
      <Box sx={{ width: "100%", padding: "5px 20px 5px 10px" }}>
        <Slider
          className={classes.sliderPrice}
          getAriaLabel={() => ""}
          value={valuePrice}
          valueLabelDisplay="auto"
          marks={marks}
          max={100000000}
          valueLabelFormat={valueLabelFormat}
          onChangeCommitted={() => handleChangeFindMaxPrice(valuePrice)}
          onChange={handleChange}
          color="secondary"
        />
      </Box>
      <Box
        className=""
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        {valuePrice.map((item, index) => (
          <Typography component={"div"} key={index}>
            {formatCurrency(item)}VNĐ
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

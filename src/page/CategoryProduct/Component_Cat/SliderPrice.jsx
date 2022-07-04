import { Box, Slider, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "utils/formatNumBerPrice";

export default function SliderPrice(props) {
  const { minMaxPrice } = props;

  const [innitalUseref, setInnitalUseref] = useState(minMaxPrice);

  const oldMinMaxPrice = useRef(innitalUseref);

  let location = useLocation();

  let params = new URL(document.location).searchParams;
  let maxPrice = params.get("max");
  let minPrice = params.get("min");
  let sttSort = params.get("sort");
  let queryKey = params.get("q");

  let initialValuePrice = [];

  if (maxPrice && minPrice) {
    initialValuePrice = [parseInt(minPrice), parseInt(maxPrice)];
  } else if (maxPrice) {
    initialValuePrice = [0, parseInt(maxPrice)];
  } else {
    initialValuePrice = [minMaxPrice.min, minMaxPrice.max];
  }

  const [valuePrice, setValuePrice] = useState(initialValuePrice);

  useEffect(() => {
    if (
      JSON.stringify(oldMinMaxPrice.current) !== JSON.stringify(minMaxPrice)
    ) {
      setValuePrice([minMaxPrice.min, minMaxPrice.max]);
      oldMinMaxPrice.current = minMaxPrice;
    }
  }, [minMaxPrice]);

  let navigate = useNavigate();
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

  const handleFindPrice = (value) => {
    let maxPrice = value[1];
    let minPrice = value[0];
    const pathParams = `?min=${minPrice}&max=${maxPrice}${
      sttSort ? "&sort=" + sttSort : ""
    }${queryKey ? "&q=" + queryKey : ""}`;
    // if (sttSort) {
    //   navigate(`?min=${minPrice}&max=${maxPrice}&sort=${sttSort}`, {
    //     replace: true,
    //   });
    // } else {
    //   navigate(`?min=${minPrice}&max=${maxPrice}`, { replace: true });
    // }
    navigate(pathParams, { replace: true });
  };

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
          getAriaLabel={() => ""}
          value={valuePrice}
          step={100000}
          defaultValue={80}
          valueLabelDisplay="auto"
          marks={marks}
          max={100000000}
          valueLabelFormat={valueLabelFormat}
          onChangeCommitted={() => handleFindPrice(valuePrice)}
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

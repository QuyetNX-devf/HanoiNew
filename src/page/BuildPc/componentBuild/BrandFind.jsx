import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  Checkbox: {
    "& .MuiSvgIcon-root": {
      fontSize: 20,
      color: theme.colorText.primary,
    },
  },
}));

export default function BrandFind(props) {
  const classes = useStyles();

  const { handleFindBrand, data, idCategory } = props;

  const [check, setCheck] = useState(false);

  const handleChangeBrand = (value) => {
    setCheck(value === check ? false : value);
  };

  useEffect(() => {
    setCheck(false);
  }, [idCategory]);

  useEffect(() => {
    if (check) {
      handleFindBrand(check);
    } else {
      handleFindBrand(false);
    }
  }, [check]);

  return (
    <FormControl sx={{ paddingLeft: "20px" }}>
      {data.map((brand, index) => (
        <FormControlLabel
          key={index}
          value={brand.name}
          control={
            <Checkbox
              checked={check === brand.brand_index ? true : false}
              className={classes.Checkbox}
            />
          }
          label={brand.name}
          onChange={() => handleChangeBrand(brand.brand_index)}
        />
      ))}
    </FormControl>
  );
}

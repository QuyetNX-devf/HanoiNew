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
export default function DistancePrice(props) {
  const classes = useStyles();

  const { handleChangeFindMaxPrice } = props;

  const [check, setCheck] = useState(false);

  const handleSortPrice = (value) => {
    setCheck(value === check ? false : value);
  };

  useEffect(() => {
    if (check) {
      const value = check.split("-");
      handleChangeFindMaxPrice(value);
    } else {
      handleChangeFindMaxPrice([false, false]);
    }
  }, [check]);

  return (
    <FormControl sx={{ paddingLeft: "20px" }}>
      <FormControlLabel
        value="female2"
        control={
          <Checkbox
            className={classes.Checkbox}
            checked={check === "0-10000000" ? true : false}
          />
        }
        label="0 - 10tr"
        onChange={() => handleSortPrice("0-10000000")}
      />
      <FormControlLabel
        value="female"
        control={
          <Checkbox
            checked={check === "10000000-20000000" ? true : false}
            className={classes.Checkbox}
          />
        }
        label="10tr - 20tr"
        onChange={() => handleSortPrice("10000000-20000000")}
      />
      <FormControlLabel
        value="female"
        control={
          <Checkbox
            checked={check === "20000000-30000000" ? true : false}
            className={classes.Checkbox}
          />
        }
        label="20tr - 30tr"
        onChange={() => handleSortPrice("20000000-30000000")}
      />
      <FormControlLabel
        value="female"
        control={
          <Checkbox
            checked={check === "30000000" ? true : false}
            className={classes.Checkbox}
          />
        }
        label="Lớn hơn 30tr"
        onChange={() => handleSortPrice("30000000")}
      />
    </FormControl>
  );
}

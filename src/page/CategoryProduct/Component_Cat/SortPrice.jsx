import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";

export default function SortPrice(props) {
  let navigate = useNavigate();
  const { maxPrice, minPrice, sttSort } = props;

  let sttCheckBox = [];
  const handleSortPrice = (value) => {
    if (value === "price-asc" && sttSort === "price-asc") {
      navigate(
        `?${minPrice !== null ? "min=" + minPrice : ""}${
          maxPrice !== null ? "&max=" + maxPrice : ""
        }`,
        {
          replace: true,
        }
      );
    } else if (value === "price-asc" && sttSort !== "price-asc") {
      navigate(
        `?${minPrice !== null ? "min=" + minPrice : ""}${
          maxPrice !== null ? "&max=" + maxPrice : ""
        }&sort=price-asc`,
        {
          replace: true,
        }
      );
    }

    if (value === "price-desc" && sttSort === "price-desc") {
      navigate(
        `?${minPrice !== null ? "min=" + minPrice : ""}${
          maxPrice !== null ? "&max=" + maxPrice : ""
        }`,
        {
          replace: true,
        }
      );
    } else if (value === "price-desc" && sttSort !== "price-desc") {
      navigate(
        `?${minPrice !== null ? "min=" + minPrice : ""}${
          maxPrice !== null ? "&max=" + maxPrice : ""
        }&sort=price-desc`,
        {
          replace: true,
        }
      );
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        value="female2"
        control={
          <Checkbox
            checked={sttSort === "price-desc" ? true : false}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 20 }, padding: "5px 10px" }}
          />
        }
        label="Giá giảm dần"
        onChange={() => handleSortPrice("price-desc")}
      />

      <FormControlLabel
        value="female"
        control={
          <Checkbox
            checked={sttSort === "price-asc" ? true : false}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 20 }, padding: "5px 10px" }}
          />
        }
        label="Giá tăng dần"
        onChange={() => handleSortPrice("price-asc")}
      />
    </FormGroup>
  );
}

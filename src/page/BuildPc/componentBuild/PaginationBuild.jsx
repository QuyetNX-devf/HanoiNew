import { Box, Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  customPagination: {
    margin: "10px",
    "& .MuiPaginationItem-root": {
      background: theme.backgroundColor.blackWhite2,
      color: theme.colorText.primary,
      border: "none",
      "&.Mui-selected": {
        background: theme.palette.primary.main,
        color: "#fff",
      },
    },
  },
}));

export default function PaginationBuild(props) {
  const { totalRows, handleChangePage, idCategory } = props;
  const [page, setPage] = useState(1);

  const handleChangePageV2 = (page) => {
    handleChangePage(page);
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [idCategory]);

  const classes = useStyles();
  return (
    <>
      {totalRows > 1 ? (
        <Box className="wrap-pagination">
          <Pagination
            className={classes.customPagination}
            onChange={(e, page) => handleChangePageV2(page)}
            count={totalRows}
            variant="outlined"
            shape="rounded"
            color="primary"
            page={page}
          />
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}

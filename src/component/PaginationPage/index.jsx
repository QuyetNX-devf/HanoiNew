import { Box, Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  customPagination: {
    "& .MuiPaginationItem-root": {
      background: theme.backgroundColor.blackWhite,
      color: theme.colorText.primary,
      border: "none",
      "&.Mui-selected": {
        background: theme.palette.primary.main,
        color: "#fff",
      },
    },
  },
}));

export default function PaginationPage(props) {
  const { totalRows, handleChangePage } = props;
  const classes = useStyles();
  return (
    <>
      {totalRows > 1 ? (
        <Box className="wrap-pagination">
          <Pagination
            className={classes.customPagination}
            onChange={(e, page) => handleChangePage(page)}
            count={totalRows}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}

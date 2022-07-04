import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate, formatName } from "utils/format";
import FormReply from "../BlockReview/cpnReview/FormReply";

const useStyles = makeStyles((theme) => ({
  titleName: {
    background: theme.backgroundColor.secondary,
  },
}));
export default function ListReview({ data }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleChangeExpanded = (panel) => {
    setExpanded(panel === expanded ? false : panel);
  };
  return (
    <Box className="wrap-list-review">
      {data.map((itemReview, index) => (
        <Box className="review-item" key={index}>
          <Accordion
            expanded={expanded === itemReview.id}
            sx={{ background: "none", boxShadow: "none" }}
          >
            <AccordionSummary
              sx={{
                "& .MuiAccordionSummary-content": {
                  display: "block",
                  margin: {
                    xs: "5px 0",
                    sm: "20px 0",
                  },
                },
                padding: "0 10px 0",
              }}
            >
              <Box className="wrap-rv-lv1">
                <Box className="avata-left">
                  <Box className="avata">
                    {formatName(itemReview.user_name)}
                  </Box>
                </Box>
                <Box className="info-right">
                  <Box className={`title-name ${classes.titleName}`}>
                    <Stack direction="row" alignItems="center" spacing={"10px"}>
                      <Typography
                        variant="h6"
                        className="_name"
                        component={"span"}
                      >
                        {itemReview.user_name}
                      </Typography>
                      <Box component={"span"}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={parseInt(itemReview.rate)}
                          size={"small"}
                          sx={{ display: "flex" }}
                          precision={1}
                          readOnly
                        />
                      </Box>
                    </Stack>
                    <Typography>{itemReview.content}</Typography>
                  </Box>
                  <Box className="reply-action">
                    <Stack
                      alignItems={"center"}
                      direction={"row"}
                      spacing={"10px"}
                    >
                      <Typography
                        variant="h7"
                        component={"span"}
                        onClick={() => handleChangeExpanded(itemReview.id)}
                      >
                        Trả lời
                      </Typography>
                      <Typography component={"span"}>
                        {formatDate(itemReview.post_time)}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Box>
              {itemReview.replies.length > 0 && (
                <Box className="reply-list">
                  {itemReview.replies.map((itemReply, indexReply) => (
                    <Box className="wrap-rv-lv2" key={indexReply}>
                      <Box className="avata-left">
                        <Box className="avata">
                          {formatName(itemReply.user_name)}
                        </Box>
                      </Box>
                      <Box className="info-right">
                        <Box className={`title-name ${classes.titleName}`}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={"10px"}
                          >
                            <Typography
                              variant="h6"
                              className="_name"
                              component={"span"}
                            >
                              {itemReply.user_name}
                            </Typography>
                            <Typography component={"span"}>
                              {formatDate(itemReply.post_time)}
                            </Typography>
                          </Stack>
                          <Typography>{itemReply.content}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <FormReply
                idReview={itemReview.id}
                handleChangeExpanded={handleChangeExpanded}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </Box>
  );
}

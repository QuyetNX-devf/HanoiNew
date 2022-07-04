import { Box } from "@mui/material";
import FooterBot from "./ComponentsFooter/FooterBot";
import FooterCenter from "./ComponentsFooter/FooterCenter";
import FooterTop from "./ComponentsFooter/FooterTop";
import "./styles.scss";

export default function Footer() {
  return (
    <Box component={"footer"}>
      <FooterTop />
      <FooterCenter />
      <FooterBot />
    </Box>
  );
}

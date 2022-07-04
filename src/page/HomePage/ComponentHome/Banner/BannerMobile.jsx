import { Box } from "@mui/material";
import BannerSlide from "../BannerSlide";

export default function BannerMobile({ dataBanner }) {
  return (
    <>
      <Box className="banner-mobile">
        {dataBanner.bannerSlideMobile.length > 0 && (
          <BannerSlide data={dataBanner.bannerSlideMobile} />
        )}
      </Box>
    </>
  );
}

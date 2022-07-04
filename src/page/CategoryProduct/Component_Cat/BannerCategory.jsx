import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getBannerByIdCategory } from "utils/category";
import SliderBanner from "./Slidebanner";

export default function BannerCategory({ idCategory }) {
  const dataBanner = useSelector((state) => state.banner).banner_category;
  const [listBanner, setListBanner] = useState([]);

  useEffect(() => {
    const banner = getBannerByIdCategory({
      data: dataBanner,
      idCategory: idCategory,
    });
    setListBanner(banner);
  }, [idCategory]);

  return listBanner.length > 0 && <SliderBanner listBanner={listBanner} />;
}

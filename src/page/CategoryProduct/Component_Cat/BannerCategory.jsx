import { getBanerCategory } from "contants/api";
import { useQuery } from "react-query";
import SliderBanner from "./Slidebanner";

export default function BannerCategory({ idCategory }) {
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: { idCategory },
    queryFn: getBanerCategory,
    keepPreviousData: true,
    retry: false,
  });
  console.log(data, "check banner");

  return data && data.length > 0 ? <SliderBanner listBanner={data} /> : "";
}

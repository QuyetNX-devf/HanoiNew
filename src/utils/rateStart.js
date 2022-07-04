import _ from "lodash";
export default function fnRate(listCrtReview) {
  const totalRate = listCrtReview.length;
  const rate5 = _.filter(listCrtReview, { rate: "5" }).length;
  const rate4 = _.filter(listCrtReview, { rate: "4" }).length;
  const rate3 = _.filter(listCrtReview, { rate: "3" }).length;
  const rate2 = _.filter(listCrtReview, { rate: "2" }).length;
  const rate1 = _.filter(listCrtReview, { rate: "1" }).length;
  const averageRate = totalRate
    ? (5 * rate5 + 4 * rate4 + 3 * rate3 + 2 * rate2 + 1 * rate1) / totalRate
    : 0;

  return { totalRate, rate5, rate4, rate3, rate2, rate1, averageRate };
}

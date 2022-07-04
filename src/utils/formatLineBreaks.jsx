export const formatLineBreaks = (text) => {
  if (text) {
    return text.replace(/\r\n/g, ",").split(",");
  } else {
    return [];
  }
};

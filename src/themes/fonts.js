import SquareWOFF from "../assets/fonts/EuclidSquare-Regular.woff";
import SquareBoldWOFF from "../assets/fonts/EuclidSquare-Bold.woff";
import SquareItalicWOFF from "../assets/fonts/EuclidSquare-Italic.woff";
import SquareLightWOFF from "../assets/fonts/EuclidSquare-Light.woff";
import SquareMediumWOFF from "../assets/fonts/EuclidSquare-Medium.woff";

const FontFace = `
  @font-face{
    font-family: Square;
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: 
      local('EuclidSquare'),
      local('EuclidSquare-Regular'),
      url(${SquareWOFF}) format('woff')
    ;
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF";
  }
  @font-face{
    font-family: SquareLight;
    font-style: normal;
    font-display: swap;
    font-weight: 300;
    src: 
      local('EuclidSquare'),
      local('EuclidSquare-Light'),
      url(${SquareLightWOFF}) format('woff')
    ;
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF";
  }
  @font-face{
    font-family: SquareMedium;
    font-style: medium;
    font-display: swap;
    font-weight: 500;
    src: 
      local('EuclidSquare'),
      local('EuclidSquare-Medium'),
      url(${SquareMediumWOFF}) format('woff')
    ;
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF";
  }
  @font-face{
    font-family: SquareBold;
    font-style: bold;
    font-display: swap;
    font-weight: 700;
    src: 
      local('EuclidSquare-Bold'),
      local('EuclidSquare-Bold'),
      url(${SquareBoldWOFF}) format('woff')
    ;
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF";
  }
  @font-face{
    font-family: SquareItalic;
    font-style: italic;
    font-display: swap;
    font-weight: 400;
    src: 
      local('EuclidSquare-Italic'),
      local('EuclidSquare-Italic'),
      url(${SquareItalicWOFF}) format('woff')
    ;
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF";
  }
`;
export default FontFace;

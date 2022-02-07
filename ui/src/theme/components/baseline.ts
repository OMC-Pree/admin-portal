import BrownBold from "../fonts/BrownLLWeb-Bold.woff2";
import BrownLight from "../fonts/BrownLLWeb-Light.woff2";
import BrownRegular from "../fonts/BrownLLWeb-Regular.woff2";

export default {
  styleOverrides: `
    @font-face {
      font-family: 'BrownLLWeb';
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: local("BrownLLWeb"), local("BrownLLWeb-Regular"), url(${BrownRegular}) format("woff2");
    }
    @font-face {
      font-family: 'BrownLLWeb';
      font-style: lighter;
      font-display: swap;
      font-weight: 200;
      src: local("BrownLLWeb"), local("BrownLLWeb-Light"), url(${BrownLight}) format("woff2");
    }
    @font-face {
      font-family: 'BrownLLWeb';
      font-style: bold;
      font-display: swap;
      font-weight: 700;
      src: local("BrownLLWeb"), local("BrownLLWeb-Bold"), url(${BrownBold}) format("woff2");
    }
  `,
};

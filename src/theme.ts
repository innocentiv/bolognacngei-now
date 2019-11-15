import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const palette = {
  primary: { main: "#33691E" },
  secondary: { main: "#BF360C" },
  background: { default: "#424242" }
};

const typography = {
  fontFamily: "'Montserrat', sans-serif"
};

export const theme = responsiveFontSizes(
  createMuiTheme({ palette, typography })
);

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const palette = {
  primary: { main: "#33691E" },
  secondary: { main: "#BF360C" }
};

export const theme = responsiveFontSizes(createMuiTheme({ palette }));

import { MatUI } from "../deps.tsx";
const theme = MatUI.createMuiTheme({
  palette: {
    primary: {
      main: "#3F51B5",
    },
    secondary: {
      main: "#E91E63",
    },
    error: {
      main: "#19857b",
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;

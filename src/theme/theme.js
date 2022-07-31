import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  typography: {
    h6: {
      fontFamily: ["Pacifico", "cursive"],
    },
    subtitle1: {
      fontFamily: ["helvetica-neue-lt-std-75-bold"],
      fontSize: "22px",
      fontWeight: "bold",
    },
  },
});

export default theme;

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useContext } from "react";
import { Store } from "../../utils/Store";
// import { useTheme } from "next-themes";
import { darkTheme, lightTheme } from "../theme";

const MUIThemeProvider = ({ children }) => {
  // const { resolvedTheme } = useTheme();
  // const [currentTheme, setCurrentTheme] = useState(darkTheme);
  // useEffect(() => {
  //   resolvedTheme === "light"
  //     ? setCurrentTheme(lightTheme)
  //     : setCurrentTheme(darkTheme);
  // }, [resolvedTheme]);

  const { state } = useContext(Store);
  const { currentTheme } = state;

  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      {/* <GlobalStyles styles={globalStyles} /> */}
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;

import { getCookie } from "cookies-next";
import { useState } from "react";
import PageProvider from "../src/helpers/PageProvider";
import { StoreProvider } from "../utils/Store";

function App(props) {
  const { Component, pageProps, initialTheme } = props;
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const setThemeHandler = (v) => setCurrentTheme(v);
  return (
    <StoreProvider>
      <PageProvider currentTheme={currentTheme}>
        <Component
          {...pageProps}
          setThemeHandler={setThemeHandler}
          currentTheme={currentTheme}
        />
      </PageProvider>
    </StoreProvider>
  );
}

App.getInitialProps = async ({ ctx }) => {
  return {
    initialTheme: getCookie("darkMode", ctx)
      ? await JSON.parse(getCookie("darkMode", ctx))
      : "light",
  };
};

export default App;

import PageProvider from "../src/helpers/PageProvider";
import { StoreProvider } from "../utils/Store";

function MyApp(props) {
  const { Component, pageProps, emotionCache } = props;
  return (
    <StoreProvider>
      <PageProvider emotionCache={emotionCache}>
        <Component {...pageProps} />
      </PageProvider>
    </StoreProvider>
  );
}

export default MyApp;

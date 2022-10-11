import createEmotionServer from "@emotion/server/create-instance";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import createEmotionCache from "../src/theme/createEmotionCache";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (MyApp) => (props) => {
        return <MyApp emotionCache={cache} {...props} />;
      },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};

// MyDocument.getInitialProps = async (ctx) => {
//   // const sheets = new ServerStyleSheets();
//   // const originalRenderPage = ctx.renderPage;
//   // ctx.renderPage = () => {
//   //   return originalRenderPage({
//   //     enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
//   //   });
//   // };
//   const initialProps = await Document.getInitialProps(ctx);
//   return {
//     ...initialProps,
//     // styles: [
//     //   ...React.Children.toArray(initialProps.styles),
//     //   sheets.getStyleElement(),
//     // ],
//   };
// };

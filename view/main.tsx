import { React, MatUI, useRouter, useDocument } from "./deps.tsx";
import theme from "./resources/theme.tsx";

export default function Main({ SSR, Component }: any) {
  const { pageProps } = SSR.attainProps;
  const { pathname } = useRouter();

  React.useEffect(() => {
    const document = useDocument();
    const jssStyles = document && document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <MatUI.ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </MatUI.ThemeProvider>
    </>
  );
}

Main.ServerSideAttain = async ({ req, res, Component, query, isServer }: any) => {
  if (!Component) {
    res.redirect("/404");
  }

  const pageProps = Component.ServerSideAttain
    ? await Component.ServerSideAttain({ req, res, Component, query, isServer })
    : {};

  return {
    attainProps: {
      pageProps,
    },
  };
};

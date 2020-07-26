import { React, MatUI, useRouter, useDocument } from "./deps.tsx";
import theme from "./resources/theme.tsx";

export default function Main({ SSR }: any) {
  const { pages, pageProps } = SSR.attainProps;
  const { pathname } = useRouter();

  // assign error page
  let Component = () => {
    return (
      <div>
        Error
      </div>
    );
  };

  React.useEffect(() => {
    const document = useDocument();
    const jssStyles = document && document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // handling the client-side-route
  if (pages[pathname]) {
    Component = pages[pathname].Component;
  }

  return (
    <>
      <MatUI.ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </MatUI.ThemeProvider>
    </>
  );
}

Main.ServerSideAttain = async ({ req, res, pages, isServer }: any) => {
  const pathname = req.url.pathname;
  if (!pages[pathname]) {
    res.redirect("/404");
  }
  const Component = pages[pathname].Component;

  const pageProps = Component.ServerSideAttain
    ? await Component.ServerSideAttain({ req, res, pages, isServer })
    : {};

  return {
    attainProps: {
      pages,
      pageProps,
    },
  };
};

import { React } from "../deps.ts";
import Home from "./pages/home.tsx";
import RouterContext from "./components/Router.tsx";
import Index from "./pages/index.tsx";


export default function Main({ ssrpathname }: any) {
  const [pathname, setPathname] = React.useState(ssrpathname ? ssrpathname : (window as any).location.pathname);

  (window as any).onpopstate = function (e: any) {
    if(e.state) {
      console.log(e.state)
      setPathname(e.state.value)
    }
  };

  React.useEffect(() => {
    console.log("pathname", pathname)
  }, [pathname])

  let Component = <h2>Error</h2>

  if (pathname === "/home") {
    Component = <Home />;
  }
  if (pathname === "/") {
    Component = <Index />;
  }

  return (
    <>
      <RouterContext.Provider value={{
        pathname: ssrpathname ? ssrpathname : (window as any).location.pathname,
        push: (value: string) => {
          const anyWindow = window as any;
          anyWindow.history.pushState({ value }, "", value);
          setPathname(value)
        }
      }}>
        {Component}
      </RouterContext.Provider>
    </>
  )
}
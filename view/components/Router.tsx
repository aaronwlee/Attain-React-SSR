import { React } from "../../deps.ts";

const RouterContext = React.createContext<any>({
  pathname: "/",
});

export const useRouter = () => React.useContext(RouterContext);

export default RouterContext;
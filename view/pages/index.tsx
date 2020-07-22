import { React } from "../../deps.ts";
import { useRouter } from "../components/Router.tsx";

export default function Index() {
  const Router = useRouter();

  return (
    <div>
      <h2>Hello welcome~</h2>
      <button onClick={() => Router.push("/home")}>go home</button>
    </div>
  )
}
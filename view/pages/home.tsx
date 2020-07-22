import { React } from "../../deps.ts";
import { useRouter } from "../components/Router.tsx";

export default function Home() {
  const [display, setDisplay] = React.useState(false);
  const Router = useRouter();

  const clicker = () => {
    console.log("click");
    setDisplay(!display)
    Router.push("/")
  }
  return (
    <div>
      <h2>hello this is home</h2>
      <button onClick={clicker}>go home</button>
      {
        display ? <p>here</p> : <p>Hello</p>
      }
    </div>
  )
}
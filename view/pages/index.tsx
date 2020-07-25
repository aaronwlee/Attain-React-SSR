import { React, useRouter, setTitle } from "../deps.tsx";
import Nav from "../components/Nav.tsx";

export default function Index() {
  const Router = useRouter();

  setTitle("React-Attain App - Index");

  return (
    <div>
      <h2>Hello welcome to index</h2>
      <Nav />
      <p>hello</p>
      <button onClick={() => Router.push("/home")}>go home</button>
    </div>
  );
}

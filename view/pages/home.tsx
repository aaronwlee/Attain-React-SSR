import { React, MatUI, useRouter, setTitle } from "../deps.tsx";
import Nav from "../components/Nav.tsx";

export default function Home({ data }: any) {
  const [display, setDisplay] = React.useState(false);
  const [testData, setTestData] = React.useState<any>(data);
  const Router = useRouter();

  setTitle("React-Attain App - Home");

  React.useEffect(() => {
    if (!data) {
      fetch("/api/user")
        .then(async (res: any) => {
          const jsonData = await res.json();
          setTestData(jsonData);
        });
    }
  }, []);

  return (
    <div>
      <MatUI.Button onClick={() => setDisplay(!display)}>
        hello this is home
      </MatUI.Button>
      <Nav />
      <button onClick={() => Router.push("/")}>go home</button>
      {display ? <p>here</p> : <p>Hello</p>}
      {testData && JSON.stringify(testData)}
    </div>
  );
}

Home.ServerSideAttain = async ({ req, res, pages, isServer }: any) => {
  const response: any = await fetch("http://localhost:3000/api/user");
  const data = await response.json();

  return {
    data,
  };
};

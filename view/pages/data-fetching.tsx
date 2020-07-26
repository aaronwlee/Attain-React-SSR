import { React, MatUI, useRouter, setTitle } from "../deps.tsx";
const {
  Button,
  Grid,
} = MatUI as any;
import Layout from "../components/Layout.tsx";


export default function DataFetching({ data }: any) {
  const [testData, setTestData] = React.useState<any>(data);
  const Router = useRouter();
  setTitle("React-Attain App - Data fetching");

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
    <Layout>
      <Grid style={{ textAlign: "center" }} container justify={"center"}>
        <Grid style={{ marginBottom: 40 }} container justify={"center"}>
          <Grid item xs={10} sm={8} md={6} >
            <a href="https://nextjs.org/" target="_blank">
              <img style={{ width: "100%" }} src="https://camo.githubusercontent.com/0bbf728fe4c8b213f3723eaac321fbb30e68be19/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313533383336313039312f7265706f7369746f726965732f6e6578742d6a732f6e6578742d6a732e706e67" />
            </a>
          </Grid>
        </Grid>
        <Grid item xs={10} sm={8}>
          <h1>Server side data fetching example page</h1>
        </Grid>
        <Grid style={{ marginBottom: 20 }} item xs={10} sm={8}>
          <p>
            The <strong>ServerSideAttain</strong> method provides a method similar to
            <br />
            <a href={"https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering"} target="_blank">
              https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
            </a>
          </p>
        </Grid>

        <Grid item xs={10} sm={8}>
          <p>
            Fetching result
          </p>
        </Grid>

        <Grid item xs={10} sm={8}>
          {
            testData && JSON.stringify(testData, undefined, 2)
          }
        </Grid>
      </Grid>
    </Layout>
  );
}

DataFetching.ServerSideAttain = async ({ req, res, pages, isServer }: any) => {
  const response: any = await fetch("http://localhost:3000/api/user");
  const data = await response.json();

  return {
    data,
  };
};

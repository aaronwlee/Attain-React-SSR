import { React, MatUI, useRouter, setTitle } from "../deps.tsx";
const {
  Button,
  Grid,
} = MatUI as any;
import Layout from "../components/Layout.tsx";


export default function DataFetching({ data }: any) {
  const [testData, setTestData] = React.useState<any>(data);
  const Router = useRouter();
  setTitle("React-Attain App - Data-fetching");

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

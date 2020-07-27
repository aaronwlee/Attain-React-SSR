import { React, MatUI, useRouter, setTitle } from "../../deps.tsx";
const {
  Button,
  Grid,
} = MatUI as any;
import Layout from "../../components/Layout.tsx";

export default function ID({ data }: any) {
  setTitle("React-Attain App - Dynamic Routing");
  const router = useRouter();

  return (
    <Layout>
      <Grid style={{ textAlign: "center" }} container justify={"center"}>
        <Grid item xs={10} sm={8}>
          <h1>Dynamic Routing</h1>
        </Grid>

        <Grid style={{ marginBottom: 50 }} container justify={"center"}>
          <p>Inside of router context, you can get params values which may contains id: {router.params.id}</p>
        </Grid>
        <Grid style={{ marginBottom: 50 }} container justify={"center"}>
          {
            router.params && JSON.stringify(router.params)
          }
        </Grid>

        <Grid style={{ marginBottom: 50 }} container justify={"center"}>
          <p>You can also find the search params in query values</p>
        </Grid>
        <Grid style={{ marginBottom: 50 }} container justify={"center"}>
          {
            router.query && JSON.stringify(router.query)
          }
        </Grid>

        <Grid style={{ marginBottom: 20 }} container justify={"center"}>
          <Grid item xs={10} sm={6} md={2}>
            <Button variant="contained" color="secondary" fullWidth onClick={() => router.push(`/dynamic/${parseInt(router.params.id) + 1}`)}>
              Go to "dynamic/{parseInt(router.params.id) + 1}"
            </Button>
          </Grid>
        </Grid>
        <Grid container justify={"center"}>
          <Grid item xs={10} sm={6} md={4}>
            <Button variant="contained" color="secondary" fullWidth onClick={() => router.push(`/dynamic/${parseInt(router.params.id) + 1}?hello=123`)}>
              Go to "dynamic/{parseInt(router.params.id) + 1}?test="123""
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
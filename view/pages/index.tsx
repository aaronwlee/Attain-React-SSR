import { React, useRouter, setTitle, MatUI } from "../deps.tsx";
import Layout from "../components/Layout.tsx";
const {
  Grid,
  Button
} = MatUI as any;

export default function Index() {
  const [count, setCount] = React.useState(1);
  setTitle("React-Attain App - Index");

  return (
    <Layout>
      <Grid style={{ textAlign: "center" }} container justify={"center"}>
        <Grid item xs={10} sm={6} >
          <a href="https://github.com/aaronwlee/Attain" target="_blank">
            <img style={{ width: "100%" }} src="./Attain.png" />
          </a>
        </Grid>
        <Grid item xs={10} sm={8}>
          <h1>Welcome to the Attain React Server Side Rendering</h1>
        </Grid>

        <Grid item xs={10} sm={8}>
          <p>
            Attain + Deno 🦕 is Awesome!
          </p>
        </Grid>
        <Grid item xs={10} sm={8}>
          <p>
            &#128077; + {count}
          </p>
        </Grid>

        <Grid container justify={"center"}>
          <Grid item xs={10} sm={6} md={2}>
            <Button variant="contained" fullWidth onClick={() => setCount(count + 1)}>
              ❤️ I love Deno 🦕
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

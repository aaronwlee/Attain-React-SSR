import { React, useRouter, setTitle, MatUI } from "../deps.tsx";
import Layout from "../components/Layout.tsx";
const {
  Grid,
  Button
} = MatUI as any;

export default function StyleGuide() {
  setTitle("React-Attain App - Style Guide");

  return (
    <Layout>
      <Grid style={{ textAlign: "center" }} container justify={"center"}>
        <Grid style={{ marginBottom: 40 }} container justify={"center"}>
          <Grid item xs={10} sm={6} md={4} lg={2} >
            <a href="https://material-ui.com/" target="_blank">
              <img style={{ width: "100%" }} src="https://material-ui.com/static/logo_raw.svg" />
            </a>
          </Grid>
        </Grid>

        <Grid item xs={10} sm={8}>
          <h1>Attain + Material UI is perfect!</h1>
        </Grid>

        <Grid item xs={10} sm={8}>
          <p>
            Material UI is a React components for faster and easier web development.
          </p>
        </Grid>

        <Grid item xs={10} sm={8}>
          <p style={{ color: "red" }}>
            <strong>Due to the basic deno compiler can't import the css modules, So I highly recommend to use Material UI.</strong>
          </p>
        </Grid>

        <Grid item xs={10} sm={8}>
          <h3>
            Recommendations
          </h3>
        </Grid>

        <Grid item xs={10} sm={8}>
          <p>styled-components - <a href={"https://styled-components.com/"} target="_blank">https://styled-components.com/</a></p>
        </Grid>
      </Grid>
    </Layout>
  );
}

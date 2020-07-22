import { App, logger, security, Router } from "https://deno.land/x/attain@cli-beta-0.1/mod.ts";
import { React, ReactDOMServer } from "./deps.ts";
import Main from "./view/main.tsx";

const jsbundlePath = "/main.js"

const app = new App();
app.use(security());
app.use(logger);

const getViewFiles = (list: string[], path: string) => {
  for (const dirEntry of Deno.readDirSync(path)) {
    if (dirEntry.isFile && dirEntry.name.includes(".tsx")) {
      list.push(`${path}/${dirEntry.name}`)
    } else if (dirEntry.isDirectory) {
      getViewFiles(list, `${path}/${dirEntry.name}`)
    }
  }
}

app.get(jsbundlePath, async (req, res) => {
  const list: string[] = []
  const importMap: any[] = [];
  getViewFiles(list, "./view")

  const jobs: any = list.map(async e => {
    if (!e.includes("./view/index.tsx")) {
      const data = (await import(e)).default
      if (typeof data === "function") {
        importMap.push(data)
      } else {
        const temp = Deno.readTextFileSync(e)
          .replaceAll(/import.*/g, "")
          .replaceAll(/export default.*/g, "")
          .replaceAll("export", "");

        const result = await Deno.transpileOnly({ [e]: temp });

        importMap.push(result[e].source)
      }
    }
  })

  try {
    await Promise.all(jobs);
  } catch (err) {
    console.error(err);
  }

  const js =
    `import React from "https://jspm.dev/react@16.13.1";
 import ReactDOM from "https://jspm.dev/react-dom@16.13.1";
 ${importMap.join("\n")}

 ReactDOM.hydrate(React.createElement(Main), document.getElementById('root'));`;

  await res.setContentType("application/javascript").status(200).send(js);
})

app.get("/*", async (req, res) => {

  const html = Deno.readTextFileSync("./view/public/index.html")
    .replace("{{ bundle }}", `<script type="module" src="${jsbundlePath}"></script>`)
    .replace("{{ render }}", ReactDOMServer.renderToString(<Main ssrpathname={req.url.pathname} />));

  res.status(200).send(html);
})

app.listen({ port: 3500 });
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

System.register("deps", ["https://jspm.dev/react@16.13.1", "https://jspm.dev/react-dom@16.13.1/server", "https://jspm.dev/react-dom@16.13.1"], function (exports_1, context_1) {
    "use strict";
    var react_16_13_1_1, server_1, react_dom_16_13_1_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_16_13_1_1_1) {
                react_16_13_1_1 = react_16_13_1_1_1;
            },
            function (server_1_1) {
                server_1 = server_1_1;
            },
            function (react_dom_16_13_1_1_1) {
                react_dom_16_13_1_1 = react_dom_16_13_1_1_1;
            }
        ],
        execute: function () {
            exports_1("React", react_16_13_1_1.default);
            exports_1("ReactDOMServer", server_1.default);
            exports_1("ReactDOM", react_dom_16_13_1_1.default);
        }
    };
});
System.register("view/components/Router", ["deps"], function (exports_2, context_2) {
    "use strict";
    var deps_ts_1, RouterContext;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (deps_ts_1_1) {
                deps_ts_1 = deps_ts_1_1;
            }
        ],
        execute: function () {
            RouterContext = deps_ts_1.React.createContext({
                pathname: "/",
            });
            exports_2("default", RouterContext);
        }
    };
});
System.register("view/pages/home", ["deps"], function (exports_3, context_3) {
    "use strict";
    var deps_ts_2;
    var __moduleName = context_3 && context_3.id;
    function Home() {
        const [display, setDisplay] = deps_ts_2.React.useState(false);
        const clicker = () => {
            console.log("click");
            setDisplay(!display);
        };
        return (deps_ts_2.React.createElement("div", null,
            deps_ts_2.React.createElement("h2", null, "hello this is home"),
            deps_ts_2.React.createElement("button", { onClick: clicker }, "go home"),
            display ? deps_ts_2.React.createElement("p", null, "here") : deps_ts_2.React.createElement("p", null, "no")));
    }
    exports_3("default", Home);
    return {
        setters: [
            function (deps_ts_2_1) {
                deps_ts_2 = deps_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("view/main", ["deps", "view/pages/home", "view/components/Router"], function (exports_4, context_4) {
    "use strict";
    var deps_ts_3, home_tsx_1, Router_tsx_1;
    var __moduleName = context_4 && context_4.id;
    function Index() {
        return deps_ts_3.React.createElement("div", null,
            deps_ts_3.React.createElement("h2", null, "Hello welcome"));
    }
    function Main({ ssrpathname }) {
        const [pathname, setPathname] = deps_ts_3.React.useState(ssrpathname ? ssrpathname : window.location.pathname);
        deps_ts_3.React.useEffect(() => {
            console.log("pathname", pathname);
        }, [pathname]);
        let Component = deps_ts_3.React.createElement("h2", null, "Error");
        if (pathname === "/home") {
            Component = deps_ts_3.React.createElement(home_tsx_1.default, null);
        }
        if (pathname === "/") {
            Component = deps_ts_3.React.createElement(Index, null);
        }
        return (deps_ts_3.React.createElement(deps_ts_3.React.Fragment, null,
            deps_ts_3.React.createElement(Router_tsx_1.default.Provider, { value: {
                    pathname: ssrpathname ? ssrpathname : window.location.pathname,
                    push: (value) => {
                        console.log("here");
                        setPathname(value);
                    }
                } }, Component)));
    }
    exports_4("default", Main);
    return {
        setters: [
            function (deps_ts_3_1) {
                deps_ts_3 = deps_ts_3_1;
            },
            function (home_tsx_1_1) {
                home_tsx_1 = home_tsx_1_1;
            },
            function (Router_tsx_1_1) {
                Router_tsx_1 = Router_tsx_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("view/index", ["deps", "view/main"], function (exports_5, context_5) {
    "use strict";
    var deps_ts_4, main_tsx_1;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (deps_ts_4_1) {
                deps_ts_4 = deps_ts_4_1;
            },
            function (main_tsx_1_1) {
                main_tsx_1 = main_tsx_1_1;
            }
        ],
        execute: function () {
            deps_ts_4.ReactDOM.hydrate(deps_ts_4.React.createElement(main_tsx_1.default), document.getElementById('root'));
        }
    };
});

__instantiate("view/index", false);

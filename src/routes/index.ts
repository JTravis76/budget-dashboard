import { Await } from "../lib/await";
import { PageLoader } from "../components/page-loader";
import $store from "../stores";
//-------------------------------------------
import { Home } from "./home";
import { Login } from "./login";
import { NotFound } from "./not-found";
//-------------------------------------------
const routes = [
  {
    path: "*",
    component: NotFound(),
    meta: {},
  },
  {
    path: "/",
    component: Home(),
    meta: {},
  },
  {
    path: "/login",
    component: Login(),
    meta: {},
  },
  {
    path: "/dashboard",
    component: import("./dashboard"),
    meta: { auth: true },
  },
  {
    path: "/transactions",
    component: import("./transactions"),
    meta: { auth: true },
  },
  {
    path: "/rulebuilder",
    component: import("./rule-builder"),
    meta: { auth: true },
  },
  {
    path: "/settings",
    component: import("./settings"),
    meta: { auth: true },
  },
  {
    path: "/about",
    component: import("./about"),
    meta: {},
  },
] as IRoute[];
//-------------------------------------------
window.addEventListener("popstate", () => {
  //e: PopStateEvent
  //console.log((e.target as Window).location);
  window.location.reload();
});
//-------------------------------------------
export const viewrouter = () => {
  const { hash } = window.location;

  const route = hash.length > 1
    ? routes.find(({ path }) => path.match(`${hash.replace("#", "")}`))
    : routes.find(({ path }) => path.match("/"));

  if (route) {
    if (route.meta.auth && !$store.user.authenticated.val)
      return Login(route.path);

    if (route.component instanceof Promise) {
      return Await({
        value: new Promise<HTMLElement>((r) => {
          (route.component as Promise<any>).then((d) => {
            if (Object.entries(d).length === 0) {
              // async component
              r(d);
            }
            else {
              // import module component
              let html = (Object.values(d)[0] as any)() as HTMLElement
              r(html);
            }
          });
        }),
        Loading: () => PageLoader(),
        Error: () => "ERROR"
      }, (v) => v);

      // = async component option
      // return Await({
      //   value: route.component,
      //   Loading: () => PageLoader(),
      //   Error: () => "error"
      // },
      //   (d) => d
      // );
    } else {
      return route.component;
    }
  }

  return routes.find(({ path }) => path === "*")?.component as
    | HTMLElement
    | undefined;
};

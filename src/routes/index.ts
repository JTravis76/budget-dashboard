import { Await } from "../lib/await";
import { PageLoader } from "../components/page-loader";
import $store from "../stores";
//-------------------------------------------
import { Home } from "./home";
import { NotFound } from "./not-found";
import { About } from "./about";
import { Transactions } from "./transactions";
import { Login } from "./login";
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
    path: "/transactions",
    component: Transactions(),
    meta: { auth: true },
  },
  {
    path: "/about",
    component: About(), // TODO: import("./about")
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
    if (route.meta.auth && !$store.user.authenticated.val) return Login(route.path);
    if (route.component instanceof Promise) {
      return Await({
        value: route.component,
        Loading: () => PageLoader(),
        Error: () => "error"
      },
        (d) => d
      );
    } else {
      return route.component;
    }
  }

  return routes.find(({ path }) => path === "*")?.component as
    | HTMLElement
    | undefined;
};

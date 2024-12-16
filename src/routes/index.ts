import { Await } from "../lib/await";
import { PageLoader } from "../components/page-loader";
//-------------------------------------------
import { Home } from "./home";
import { NotFound } from "./not-found";
import { About } from "./about";
import { Transactions } from "./transactions";
//-------------------------------------------
const routes = [
  {
    path: "*",
    component: NotFound(),
  },
  {
    path: "/",
    component: Home(),
  },
  {
    path: "/transactions",
    component: Transactions(),
  },
  {
    path: "/about",
    component: About(), // TODO: import("./about")
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

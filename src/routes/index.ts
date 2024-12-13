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
    name: "Not Found",
    component: NotFound(),
  },
  {
    path: "/",
    name: "Home",
    component: Home(),
  },
  {
    path: "/transactions",
    name: "Transaction",
    component: Transactions(),
  },
  {
    path: "/about",
    name: "About",
    component: About(), // TODO:import("./views/about")
  },
] as IRoute[];
//-------------------------------------------
export const viewrouter = () => {
  const { pathname } = window.location;
  const route = routes.find(({ path }) => path.match(pathname));
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

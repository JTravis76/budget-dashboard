/* Main entry point for the application.
 * Here we made use of the "Await" function, which is a Van-UI component.
 * This allows us to fetch [ALL] initial data BEFORE displaying the app.
 * All data is sent the central store for later use. It also prevent a race condition
 * where component are rendered before the data is returned.
 */
import van from "vanjs-core";
import { viewrouter } from "./routes";
import { LayoutHeader } from "./components/layout-header";
import { LayoutFooter } from "./components/layout-footer";
import { LayoutSideBar } from "./components/layout-sidebar";
import { PageLoader } from "./components/page-loader";
import $store from "./stores";
import { Await } from "./lib/await";

export const App = () => {
  const { div, main } = van.tags;
  //------------------------------------------- 
  $store.user.getUser();
  //-------------------------------------------
  return Await({
    value: $store.site.preload(),
    Loading: () => PageLoader(),
    Error: () => "Error"
  },
    () =>
      div(
        LayoutHeader(),
        main(
          viewrouter(),
          div({ class: "footer-padding" }),
        ),
        LayoutSideBar(),
        LayoutFooter(),
      )
  );
};

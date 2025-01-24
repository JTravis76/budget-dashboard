import van from "vanjs-core";

const { div, blockquote, br, code, h1, h2, h3, li, p, pre, ul } = van.tags


export const About = () => {
  return div({ class: "container mt-2" },
    div({ class: "box content" },
      h1({ class: "title is-2" },
        "Budget Dashboard",
      ),
      p(
        "After being introduce to VanJS, I thought it would be interesting to build an application to review some bank transactions. And hopefully, come up with a form of a budget. Ha!",
        br(),
        "Some features would be to:",
      ),
      ul(
        li(
          "Display a list of bank transactions",
        ),
        li(
          "Import transaction via a CSV file",
        ),
        li(
          "Edit memo and tags for a transaction",
        ),
        li(
          "Search and filtering transactions",
        ),
        li(
          "Removing a transaction.",
        ),
      ),
      p(
        "Some nice-to-have:",
      ),
      ul(
        li(
          "Tag rule wizard",
        ),
        li(
          "Charts w/ page data slicers",
        ),
        li(
          "Reports",
        ),
      ),
      p(
        "Having a strong background in VueJS and TypeScript, you might see some similar approach find in VueJS, like Views, Components, Router, and Stores. Also, I am a strong advocate for TypeScript. So use it, love it :-)",
      ),
      h2({ class: "title is-3" },
        "CSS and Theme",
      ),
      p(
        "For this project, we are using SCSS along with the Bulma CSS library. Bulma is loaded via CDN provide by CloudFlare.",
      ),
      h2({ class: "title is-3" },
        "Route and Views",
      ),
      p(
        "IMHO, Views components are the same as routes. When you hit the 'About' page from the URL, you are displayed with the 'About' component. Under the ",
        code(
          "src/routes",
        ),
        " directory, you will find both routing logic and view components.",
      ),
      h3({ class: "title is-4" },
        "Asynchronous Component",
      ),
      p(
        "Component at the router/view level might be asynchronous. The best way to handle was to test for a ",
        code(
          "typeof Promise",
        ),
        " and use the \"Await\" library provided in the VanJS-UI kit.",
      ),
      blockquote(
        p(
          "NOTE: VanJS-UI kit is NOT used in this project. I only copied the \"Await\" method. See ",
          code(
            "src/lib/await.ts",
          ),
          ".",
        ),
      ),
      p(
        "I my recent release, I was able to import the route component by doing this.",
      ),
      pre(
        code({ class: "language-ts" },
          "{\n  path: \"/about\",\n  component: import(\"./about\"),\n  meta: {},\n},\n",
        ),
      ),
      p(
        "Importing a route convert the return result from ",
        code(
          "typeof Promise",
        ),
        " to a ",
        code(
          "typeof Module",
        ),
        ". Doing this approach, in-sure the component is not rendered or executed until it's actual needed.",
      ),
      h2({ class: "title is-3" },
        "Props, Slot, and Emitters",
      ),
      p(
        "Oftentimes, components might be a shell that is usable. One example of this is a Modal. Modal is a window that appears over all other windows and can display various types of content. \"Modal-Frame\" in this project, uses props, slot, and emitters. See ",
        code(
          "src/components/modal-frame.ts",
        ),
      ),
      ul(
        li(
          "Props use to pass in data from the parent component to the child component (Modal-Frame).",
        ),
        li(
          "Slot is the HTML content to display in the body of the Modal-Frame.",
        ),
        li(
          "Emitter is the action triggered by the child component (Modal-Frame) back to the parent component.",
        ),
      ),
      h2({ class: "title is-3" },
        "Central Store",
      ),
      p(
        "VanJS is able to maintain a reactive state. This makes is easy to create a central store that allows all components to read and write data from a single-source-of-truth. To keep things clean, the store is broken into module and are namespace. See ",
        code(
          "src/stores/index.ts",
        ),
        ".",
      ),
      h2({ class: "title is-3" },
        "API and Data Store",
      ),
      p(
        "To get things moving, HTTP client is a wrapper around Fetch API with the attempt to closely match Axios client (as far as general use). The \"swagger-client\" is the controller for sending/receiving requests. So the \"swagger-client\" might act a API middleware before calling the LocalDB.",
      ),
      p(
        "LocalDB is a library for CRUD operations to the browser's local-storage.",
      ),
      p(
        "Once the actual API is ready, we should be to easily switch from LocalDB to API endpoints.",
      ),
      h1({ class: "title is-3" },
        "Contribute",
      ),
      p(
        "See a better way to achieving something or features that would be useful, submit a pull-requests!",
      ),
      h1({ class: "title is-3" },
        "License",
      ),
      p(
        "MIT",
      ),

    ),
  );
}
# Budget Dashboard

After being introduce to VanJS, I thought it would be interesting to build an application to review some bank transactions. And hopefully, come up with a form of a budget. Ha!  
Some features would be to:

- Display a list of bank transactions
- Import transaction via a CSV file
- Edit memo and tags for a transaction
- Search and filtering transactions
- Removing a transaction.

Some nice-to-have:

- Tag rule wizard
- Charts w/ page data slicers
- Reports

Having a strong background in VueJS and TypeScript, you might see some similar approach find in VueJS, like Views, Components, Router, and Stores. Also, I am a strong advocate for TypeScript. So use it, love it :-)

## CSS and Theme

For this project, we are using SCSS along with the Bulma CSS library. Bulma is loaded via CDN provide by CloudFlare.

## Route and Views

IMHO, Views components are the same as routes. When you hit the 'About' page from the URL, you are displayed with the 'About' component. Under the `src/routes` directory, you will find both routing logic and view components.

### Asynchronous Component

Component at the router/view level might be asynchronous. The best way to handle was to test for a `typeof Promise` and use the "Await" library provided in the VanJS-UI kit.

> NOTE: VanJS-UI kit is NOT used in this project. I only copied the "Await" method. See `src/lib/await.ts`.

I my recent release, I was able to import the route component by doing this.

```ts
{
  path: "/about",
  component: import("./about"),
  meta: {},
},
```

Importing a route convert the return result from `typeof Promise` to a `typeof Module`. Doing this approach, in-sure the component is not rendered or executed until it's actual needed.

## Props, Slot, and Emitters

Oftentimes, components might be a shell that is usable. One example of this is a Modal. Modal is a window that appears over all other windows and can display various types of content. "Modal-Frame" in this project, uses props, slot, and emitters. See `src/components/modal-frame.ts`

- Props use to pass in data from the parent component to the child component (Modal-Frame).
- Slot is the HTML content to display in the body of the Modal-Frame.
- Emitter is the action triggered by the child component (Modal-Frame) back to the parent component.

## Central Store

VanJS is able to maintain a reactive state. This makes is easy to create a central store that allows all components to read and write data from a single-source-of-truth. To keep things clean, the store is broken into module and are namespace. See `src/stores/index.ts`.

## API and Data Store

To get things moving, HTTP client is a wrapper around Fetch API with the attempt to closely match Axios client (as far as general use). The "swagger-client" is the controller for sending/receiving requests. So the "swagger-client" might act a API middleware before calling the LocalDB.

LocalDB is a library for CRUD operations to the browser's local-storage.

Once the actual API is ready, we should be to easily switch from LocalDB to API endpoints.

# Contribute

See a better way to achieving something or features that would be useful, submit a pull-requests!

# License

MIT

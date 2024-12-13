interface IRoute {
  path: string;
  name: string;
  component: HTMLElement | Promise<any>;
}
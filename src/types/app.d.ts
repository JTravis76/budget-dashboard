interface IRoute {
  path: string;
  component: HTMLElement | Promise<any>;
}
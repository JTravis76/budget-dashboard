interface IRoute {
  path: string;
  component: HTMLElement | Promise<any>;
}

interface IDateRange {
  start: string | null;
  end: string | null;
}

interface ISearchFilter {
  search: string | null;
  date: IDateRange;
  amount: IDateRange;
}
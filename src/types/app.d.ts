interface IRoute {
  path: string;
  component: HTMLElement | Promise<any>;
  meta: {
    auth?: boolean;
  };
}

interface IDateRange {
  start: string | null;
  end: string | null;
}

interface ISearchFilter {
  search: string | null;
  tag: string | null;
  date: IDateRange;
  amount: IDateRange;
  page: number;
  pagesize: number
  pagecount: number;
}
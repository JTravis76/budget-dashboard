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

//type SlicerType = "checkbox" | "input";

interface ISlicerData {
  text: string;
  value: string;
  selected: boolean;
}

interface ISlicer {
  title: string;
  active: boolean;
  collapse: boolean;
  //type: SlicerType;
  data: ISlicerData[] | string;
}

type ITagProperty = Record<string, IRuleProperty>;

interface IRuleProperty {
  amount: number;
  tag: string;
}
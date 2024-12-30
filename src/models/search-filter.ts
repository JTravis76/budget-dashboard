export class DateRange {
  constructor(init?: Partial<DateRange>) {
    this.start = null;
    this.end = null;

    if (init) Object.assign(this, init);
  }
  start: string | null;
  end: string | null;
}

export class SearchFilter implements ISearchFilter {
  constructor(init?: Partial<SearchFilter>) {
    this.search = null;
    this.tag = null;
    this.date = new DateRange();
    this.amount = new DateRange();
    this.page = 1;
    this.pagesize = 25;
    this.pagecount = 1;

    if (init) Object.assign(this, init);
  }
  search: string | null;
  tag: string | null;
  date: DateRange;
  amount: DateRange;
  page: number;
  pagesize: number;
  pagecount: number;
}
export class DateRange {
  constructor(init?: Partial<DateRange>) {
    this.start = null;
    this.end = null;

    if (init) Object.assign(this, init);
  }
  start: string | null;
  end: string | null;
}

export class SearchFilter {
  constructor(init?: Partial<SearchFilter>) {
    this.search = null;
    this.date = new DateRange();
    this.amount = new DateRange();

    if (init) Object.assign(this, init);
  }
  search: string | null;
  date: DateRange;
  amount: DateRange;
}
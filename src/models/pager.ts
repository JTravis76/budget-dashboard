export class Pager {
  constructor(init?: Partial<Pager>) {
    this.page = 1;
    this.pagesize = 25;
    this.total = 1;

    if (init) Object.assign(this, init);
  }
  page: number;
  pagesize: number;
  total: number;
}
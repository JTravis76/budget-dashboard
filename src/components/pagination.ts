/* This component provides pagination. It is oftentimes used with a data-grid or table to reduce the
 * number of records that is displayed. The component requires two props;
 * - current page index that is displayed.
 * - total pages within the collection.
 * 
 * The max number of pages showed is set to (3). As the user navigates through the pages, we slide the center
 * three pages along the scale. In the figure below, page (1) and (12) are showed to allow the user to quickly
 * jump to either the first page or last page. Page (4,5,6) are the centered pages and is calculated based on the 
 * middle of the scale and the selected page.
 *             [1] 0 2 3 [4] [5] [6] 7 8 9 10 11 0 [12]
 * In the array of pages, we are using (0) to generate an ellipsis that separate the first/last page from the
 * center pages.
 */
import van from "vanjs-core";
import emitter from "../lib/event-emitter";
import { Pager, SearchFilter } from "../models";

//---------------------------------------------
interface IProp {
  page: number;
  pagesize: number;
  total: number;
}

export const Pagination = (props?: IProp) => {
  const { div, nav, ul, li, span, a, select, option } = van.tags;
  //---------------------------------------------
  let filters = new SearchFilter();
  //---------------------------------------------
  const pager = new Pager(props);
  let pages = van.state(new Array<number>());

  const maxPages = 3; // max number of pages displayed between 1 and total
  let start = van.state(1);
  let end = van.state(pager.total);

  if (end.val > maxPages) {
    let middle = Math.ceil(maxPages / 2) - 1;
    let low = pager.page - middle;
    let high = pager.page + middle;

    if (low < 2) {
      high = maxPages;
      low = 1;
    } else if (high > pager.total - 2) {
      high = pager.total;
      low = pager.total - maxPages + 1;
    }

    start.val = low;
    end.val = high;
  }

  pages.val = [];
  // include first page
  if (start.val > 2) {
    pages.val.push(1);
    pages.val.push(0);
  }
  else if (start.val > 1) {
    pages.val.push(1);
  }
  // build center pages  
  for (let i = start.val; i <= end.val; i++) {
    pages.val.push(i);
  }
  // include last page
  if (end.val < pager.total) {
    pages.val.push(0);
    pages.val.push(pager.total);
  }
  //---------------------------------------------
  return div({ class: "mb-4" },
    div(
      { class: "is-pulled-right" },
      select(
        {
          class: "input",
          title: "page size",
          onchange: (e: Event) => {
            filters.page = 1;
            filters.pagesize = parseInt((e.target as HTMLSelectElement).value, 10);
            emitter.emit("page", filters);
          },
        },
        [25, 50, 100].map((x) => option({ selected: props?.pagesize == x }, x)),
      ),
    ),
    nav(
      {
        class: "pagination is-small is-rounded",
        role: "navigation",
        ariaLabel: "pagination",
      },
      ul({ class: "pagination-list" },
        pages.val.map((page) =>
          page
            ? li(
              a(
                {
                  href: "#",
                  ariaLabel: `goto page ${page}`,
                  class: () => page === pager.page ? "pagination-link is-current" : "pagination-link",
                  onclick: (e: Event) => {
                    e.preventDefault();
                    filters.page = page;
                    emitter.emit("page", filters);
                  }
                },
                page
              )
            )
            : li(
              span({ class: "pagination-ellipsis" }, "…"
              ),
            ),
        )
      ),
    ),
  );
}
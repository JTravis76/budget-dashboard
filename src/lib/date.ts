// const trans = [
//   { dttm: "2/2/2024" },
//   { dttm: "4/8/2024" },
//   { dttm: "7/23/2024" },
//   { dttm: "6/14/2026" },
// ];

// let start = trans[0].dttm;
// let end = trans[trans.length - 1].dttm;

function formatDate(dttm: string) {
  let months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let d = new Date(dttm);
  return {
    long: `${d.getFullYear()}-${months[d.getMonth() + 1]}`,
    short: `${d.getFullYear()}-${d.getMonth() + 1}`,
  };
}

function getDateParts(dttm: string) {
  let d = new Date(dttm);
  return {
    m: d.getMonth() + 1,
    d: d.getDate(),
    y: d.getFullYear(),
  };
}

function monthsBetween(date1: string, date2: string) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const years = d2.getFullYear() - d1.getFullYear();
  const months = d2.getMonth() - d1.getMonth();

  return years * 12 + months;
}


/** Build a collection of slicer data based on starting and ending dates.
 * Only the month and year is calculated.
 * @param start starting date "1/1/2024"
 * @param end ending date "12/1/2024"
 */
export function buildDateList(start: string, end: string) {
  let options = new Array<ISlicerData>();
  let parts = getDateParts(start);
  for (let i = 0; i <= monthsBetween(start, end); i++) {
    let m = parts.m + i;
    let y = parts.y;

    // adjustment up to 4 years
    if (m > 48) {
      m = m - 48;
      y = y + 4;
    } else if (m > 36) {
      m = m - 36;
      y = y + 3;
    } else if (m > 24) {
      m = m - 24;
      y = y + 2;
    } else if (m > 12) {
      m = m - 12;
      y = y + 1;
    }

    const { long, short } = formatDate(`${m}/1/${y}`);
    options.push({
      text: long,
      value: short,
      selected: false
    });
  }
  return options;
}
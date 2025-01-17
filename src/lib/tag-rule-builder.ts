const transactions = [
  { dttm: "2024-01-15", name: "Gas Station Pro", amount: -25.55, tag: "Shopping:Fuel" },
]

let transaction = { dttm: "2024-01-30", name: "Gas Station Pro", amount: -42.63, tag: null };

interface IRuleProperty {
  amount: number;
  tag: string;
}

// == Nice-to-have: rules builder
let listOfRules: Record<string, IRuleProperty[]>[] = [
  {
    "Gas Station":
      [
        { amount: 40, tag: "Shopping:Fuel" },
        { amount: 0, tag: "Shopping:Grocery" }
      ]
  },
];

function assignTag(trans: typeof transaction) {
  let tag = "";
  for (let i = 0; i < listOfRules.length; i++) {
    const rule = listOfRules[i];
    let name = Object.keys(rule)[0];

    // == 1st step of the rule
    if (trans.name.includes(name)) {

      // == 2nd step:
      // sort the amount rule DESC and if greater, set tag value
      Object.values(rule)[0]
        .sort((a, b) => a.amount < b.amount ? 1 : -1)
        .forEach((property) => {
          if (tag === "" && Math.abs(trans.amount) > property.amount)
            tag = property.tag;
        });

      if (tag !== "") break;
    }
  }
  return tag;
}


/*
// keyword in the 'name' field to search upon
let keyword = "New Keyword";
// thresehold amount to apply this rule.
// this can be use for assigining different tags under the same keyword
// Note: rule order is important. Sorting amount DESC
let amount = 0;
// Required: the tag to be returned for the matching rule
let tag = "Shopping";

let properties = new Array<IRuleProperty>();
properties.push({ amount, tag });

listOfRules.push({
  keyword: properties
});
*/
console.log(
  assignTag(transaction)
)
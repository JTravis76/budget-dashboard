export const transactions: ITransaction[] = [
  { id: 1, dttm: "11/1/2024", transaction: "DEBIT", name: "DEBIT PURCHASE -VISA KROGER #0001    111-555-1234AA", memo: null, amount: -99.91, tag: null },
  { id: 2, dttm: "11/4/2024", transaction: "DEBIT", name: "DEBIT PURCHASE -VISA WENDY #1111     740-555-5555OH", memo: null, amount: -29.32, tag: null },
];

export const tags = [
  "Banking:Cash",
  "Banking:Fees",
  "Bills:Cable",
  "Bills:Cell Phone",
  "Bills:Credit Card",
  "Bills:Electric",
  "Bills:Garbage",
  "Bills:Gas",
  "Bills:Insurance",
  "Bills:Loan",
  "Bills:Medical",
  "Bills:Water",
  "Income:Paycheck",
  "Service",
  "Service:Bottle Water",
  "Service:Software",
  "Service:Streaming",
  "Shopping",
  "Shopping:Auto",
  "Shopping:Clothing",
  "Shopping:Dining",
  "Shopping:Fuel",
  "Shopping:Grocery",
  "Shopping:Health/Body",
  "Shopping:Pet Care",
  "Shopping:Unknown",
  "Transfer",
  "Transfer:Saving",
];

export const rules = [
  {
    "KROGER FUEL": [
      { amount: 0, tag: "Shopping" },
      { amount: 50.00, tag: "Shopping:Fuel" },
    ]
  },
  {
    "WENDY": [
      { amount: 0, tag: "Shopping:Dining" },
    ]
  }
];

export const users = [
  { email: "", password: "Og==", darkTheme: false }
];
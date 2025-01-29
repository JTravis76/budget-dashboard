import dbcontext from "./local-db";

function initDB() {
  if (!dbcontext.rules.exist())
    saveChanges([]);
}

/** save the schema to localstorage */
function saveChanges(schema = new Array<ITagProperty>()) {
  dbcontext.rules.set(schema);
}

function saveOrUpdate(key: string, value: IRuleProperty) {
  key = key.toUpperCase();

  const all = getAll();

  let rule = all.find((x) => Object.keys(x).includes(key));
  if (rule) {
    let properties = rule[key];
    let prop = properties.find((x) => x.amount == value.amount || x.tag == value.tag);
    if (prop) update(key, value, prop);
    else {
      // append and sort
      properties.push(value);
      properties = properties.sort((a, b) => a.amount < b.amount ? 1 : -1);
      saveChanges(all);
    }
  }
  else {
    create(key, value);
  }
}

function importRules(rules: ITagProperty[]) {
  deleteAll();
  saveChanges(rules);
  return 200;
}


//-------------------------------------------
// == (C)reate, (U)pdate, (R)ead, (D)elete == //
//-------------------------------------------


/** Insert a new rule */
function create(key: string, value: IRuleProperty) {
  let tagProp = {} as ITagProperty;
  tagProp[key.toUpperCase()] = [value];

  const all = getAll();
  all.push(tagProp);
  saveChanges(all);
}

/** Updates the existing properties of the rule
 * @param key the existing keyword to filter.
 * @param value the new property value.
 * @param rule the existing property to replace.
 */
function update(key: string, value: IRuleProperty, rule: IRuleProperty) {
  let all = getAll();
  let r = all.find((x) => Object.keys(x).includes(key));
  if (r) {
    let properties = r[key];
    properties.forEach((p) => {
      if (p.amount == rule.amount && p.tag == rule.tag) {
        Object.assign(p, value);
      }
    });
    all = Object.assign(all, r);
    saveChanges(all);
  }
}

function getAll() {
  initDB();
  return dbcontext.rules.get<ITagProperty[]>();
}

/** Remove a rule */
function deleteBy(key: string, value: IRuleProperty) {
  let all = getAll();
  for (let i = 0; i < all.length; i++) {
    let r = all[i];
    let k = Object.keys(r)[0];
    let v = Object.values(r)[0];
    if (k === key) {
      v.forEach((p, idx) => {
        // found matching rule property, now remove it
        if (p.amount == value.amount && p.tag == value.tag) {
          v.splice(idx, 1);
        }
        // If last property is removed, then delete the entire rule
        if (v.length === 0) {
          all.splice(i, 1);
        }
      });

      saveChanges(all);
      break;
    }
  }
  return 200;
}

/** Removes all the records */
function deleteAll() {
  saveChanges([]);
  return 200;
}



export default {
  getAll,
  saveOrUpdate,
  deleteBy,
  deleteAll,
  importRules,
}
import dbcontext from "./local-db";
import { users } from "./data";

function initDB() {
  if (!dbcontext.user.exist())
    saveChanges(users);
}

/** save the schema to localstorage */
function saveChanges(schema = new Array<IUser>()) {
  dbcontext.user.set(schema);
}

/** Process a collection of transactions */
function saveOrUpdate(user: IUser) {
  let all = getAll();
  let u = all.find((x) => x.email === user.email);
  if (u) update(user);
  else create(user);
  return 200;
}

function authenticate(email: string, password: string) {
  let user = getUser(email);
  if (user && user.password == password) return user;
  return 401;
}


//-------------------------------------------
// == (C)reate, (U)pdate, (R)ead, (D)elete == //
//-------------------------------------------

/** Insert a new rule */
function create(user: IUser) {
  const all = getAll();
  all.push(user);
  saveChanges(all);
}

function update(user: IUser) {
  let all = getAll();
  all.forEach((u) => {
    if (u.email === user.email) Object.assign(u, user);
  });
  saveChanges(all);
}

function getAll() {
  initDB();
  return dbcontext.user.get<IUser[]>();
}

function getUser(email: string) {
  let all = getAll();
  let user = all.find((x) => x.email === email);
  if (user) return user;
  return null;
}

export default {
  authenticate,
  saveOrUpdate,
  getUser,
}
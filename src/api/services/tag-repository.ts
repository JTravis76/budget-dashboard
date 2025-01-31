import dbcontext from "./local-db";
import { tags } from "./data";

function initDB() {
  if (!dbcontext.tags.exist())
    saveChanges(tags);
}

/** save the schema to localstorage */
function saveChanges(schema = new Array<string>()) {
  dbcontext.tags.set(schema);
}

function importTags(tags: string[]) {
  deleteAll();
  saveChanges(tags);
  return 200;
}


//-------------------------------------------
// == (C)reate, (U)pdate, (R)ead, (D)elete == //
//-------------------------------------------


function getAll() {
  initDB();
  return dbcontext.tags.get<string[]>();
}

/** Removes all the records */
function deleteAll() {
  saveChanges([]);
  return 200;
}

export default {
  getAll,
  importTags,
  deleteAll,
}
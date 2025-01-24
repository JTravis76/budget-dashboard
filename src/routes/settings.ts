import van from "vanjs-core";
import { SettingBackupRestore } from "../components/setting-backup-restore";
import { SettingTagRule } from "../components/setting-tag-rule";
import { SettingResetDb } from "../components/settings-reset-db";

const { div } = van.tags;

export const Settings = () => {
  return div({ class: "container mt-2" },
    SettingBackupRestore(),
    SettingTagRule(),
    SettingResetDb(),
  );
}
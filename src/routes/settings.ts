import van from "vanjs-core";
import { SettingBackupRestore } from "../components/setting-backup-restore";
import { SettingTagRule } from "../components/setting-tag-rule";
import { SettingResetDb } from "../components/settings-reset-db";
import { SettingTheme } from "../components/settings-theme";

export const Settings = () => {
  const { div } = van.tags;
  //---------------------------------------------
  return div({ class: "container mt-2" },
    SettingTheme(),
    SettingBackupRestore(),
    SettingTagRule(),
    SettingResetDb(),
  );
}
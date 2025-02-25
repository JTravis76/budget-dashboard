import van from "vanjs-core";
import { ToggleSwitch } from "./toggle-switch";
import { IconSun, IconMoon } from "./icons";
import emitter from "../lib/event-emitter";
import $store from "../stores";
import { setTheme } from "../lib/utilities";

export const SettingTheme = () => {
  const { div, h4 } = van.tags;
  //---------------------------------------------
  let user = $store.user.profile.val;
  //---------------------------------------------
  let style = "border-left: 2px solid; padding-left: 10px;";
  //---------------------------------------------
  emitter.subscribe("toggle", (val: boolean) => {
    setTheme(val);
    user.darkTheme = val;
    $store.user.saveUser(user);
  });
  //---------------------------------------------
  return div({ class: "columns" },
    div({ class: "column is-one-fifth" },
      h4({ class: "title is-4" }, "Theme")
    ),
    div({ class: "column" },
      div({ style },
        ToggleSwitch(
          {
            id: "sw-1",
            offLabel: IconSun(),
            onLabel: IconMoon(),
            state: user.darkTheme
          }
        )
      ),
    ),

  );
}
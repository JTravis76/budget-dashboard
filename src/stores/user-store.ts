import van from "vanjs-core";
import $cookie from "../lib/cookie-manager";
import http from "../api/swagger-client";
import controller from "../api/controller";
import { User } from "../api/schema";
import { setTheme } from "../lib/utilities";

export const useUserStore = () => {
  let authenticated = van.state(false);
  const profile = van.state(new User());
  //-------------------------------------------
  async function login(email: string, password: string): Promise<void> {
    let encoded = window.btoa(`${email}:${password}`);
    return new Promise((r) => {
      controller.login.post({ credential: encoded }).then((res) => {
        profile.val = new User(res);
        $cookie.setExpire(profile.val.email);
        r();
      }).catch(() => { });
    });
  }
  //-------------------------------------------
  async function signout() {
    return new Promise((r) => {
      $cookie.remove();
      r(200);
    });
  }
  //-------------------------------------------
  function getUser() {
    let parts = $cookie.get().split(";");
    parts.forEach((p) => {
      let arr = p.split("=");
      switch (arr[0].trim()) {
        case "email":
          controller.user.get(arr[1])
            .then((res) => {
              profile.val = new User(res ?? {});
              setTheme(profile.val.darkTheme);
            })
          break;

        case "expires":
          // check if expired
          authenticated.val = (new Date() <= new Date(arr[1]));
          if (authenticated.val) $cookie.setExpire(profile.val.email);
          break;
      }
    });
  }
  //-------------------------------------------
  async function saveUser(user: IUser) {
    return await http.user.post(user);
  }
  //-------------------------------------------
  return {
    authenticated,
    profile,
    login,
    signout,
    getUser,
    saveUser,
  };
}
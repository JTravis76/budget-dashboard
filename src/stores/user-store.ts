import van from "vanjs-core";
import $cookie from "../lib/cookie-manager";
import http from "../api/swagger-client";
import { User } from "../api/schema";
import { setTheme } from "../lib/utilities";

export const useUserStore = () => {
  let authenticated = van.state(false);
  const profile = van.state(new User());
  //-------------------------------------------
  async function login(email: string, password: string) {
    return new Promise((r) => {
      let encoded = window.btoa(`${email}:${password}`);
      http.user.authenticate(email, encoded)
        .then((res) => {
          if (typeof res === "number") r(res)

          if (res instanceof Object) {
            profile.val = new User(res);
            $cookie.setExpire(profile.val.email);
            r(200);
          }
          r(500);
        })
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
  async function getUser() {
    return new Promise((r) => {
      let parts = $cookie.get().split(";");
      parts.forEach((p) => {
        let arr = p.split("=");
        switch (arr[0].trim()) {
          case "email":
            http.user.get(arr[1])
              .then((res) => {
                profile.val = new User(res ?? {});
                setTheme(profile.val.darkTheme);
              });
            break;

          case "expires":
            // check if expired
            authenticated.val = (new Date() <= new Date(arr[1]));
            if (authenticated.val) $cookie.setExpire(profile.val.email);
            break;
        }
      });

      r(200);
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
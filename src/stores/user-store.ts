import van from "vanjs-core";
import $cookie from "../lib/cookie-manager";

export const useUserStore = () => {
  let authenticated = van.state(false);
  //-------------------------------------------
  async function login(username: string, password: string) {
    return new Promise((r) => {
      let encoded = window.btoa(`${username}:${password}`);
      if (encoded === "Og==") $cookie.setExpire();
      r(200);
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
      let arr = $cookie.get().split("=");
      // check if expired
      authenticated.val = (new Date() <= new Date(arr[1]));
      if (authenticated.val) $cookie.setExpire();
      r(200);
    });
  }

  return {
    authenticated,
    login,
    signout,
    getUser,
  };
}
import van from "vanjs-core";

export const useUserStore = () => {
  let authenticated = van.state(false);
  //-------------------------------------------
  async function login(username: string, password: string) {
    let encoded = window.btoa(`${username}:${password}`);
    // console.log(encoded);

    return new Promise((r) => {
      if (encoded === "Og==") {
        let d = new Date();
        let m = d.getMinutes() + 15;
        d.setMinutes(m);
        document.cookie = `expires=${new Date(d).toUTCString()};`;
      }
      r(200);
    });
  }
  //-------------------------------------------
  async function signout() {
    return new Promise((r) => {
      // You can delete a cookie by updating its expiration time to zero.
      document.cookie = `expires=0;`;
      r(200);
    });
  }
  //-------------------------------------------
  async function getUser() {
    return new Promise((r) => {
      let arr = document.cookie.split("=");
      // check if expired
      authenticated.val = (new Date() <= new Date(arr[1]));
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
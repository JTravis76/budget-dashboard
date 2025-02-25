export default {
  get: () => document.cookie,
  setExpire: (email: string) => {
    let d = new Date();
    let m = d.getMinutes() + 15;
    d.setMinutes(m);
    document.cookie = `expires=${new Date(d).toUTCString()};`;
    document.cookie = `email=${email};`;
  },
  // You can delete a cookie by updating its expiration time to zero.
  remove: () => document.cookie = "expires=0;",
}
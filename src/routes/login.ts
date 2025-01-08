/* Here is a standard login page with email and password field.
 * Upon clicking the 'Login' button, we sent the username and password to the server.
 * If successfull authentication, we then check if the user was redirect here from another page
 * (maybe if the page was bookmark). Otherwise, we send them back to the home page. */
import van from "vanjs-core";
import $store from "../stores";
import { IconEnvelope, IconLock } from "../components/icons";

const { button, div, form, input, label, section, span } = van.tags

//-------------------------------------------
export const Login = (redirect?: string) => {
  let username = van.state("");
  let password = van.state("");
  //-------------------------------------------
  return section({ class: "hero" },
    div({ class: "hero-body" },
      div({ class: "container" },
        div({ class: "columns is-centered" },
          div({ class: "column is-5-tablet is-4-desktop is-3-widescreen" },
            form({ action: "", class: "box" },
              div({ class: "field" },
                label({ for: "", class: "label" },
                  "Email",
                ),
                div({ class: "control has-icons-left" },
                  input(
                    {
                      type: "email",
                      placeholder: "e.g. bobsmith@gmail.com",
                      class: "input",
                      required: "",
                      oninput: (e: Event) => username.val = (e.target as HTMLInputElement).value
                    }),
                  span({ class: "icon is-small is-left" },
                    IconEnvelope(),
                  ),
                ),
              ),
              div({ class: "field" },
                label({ for: "", class: "label" },
                  "Password",
                ),
                div({ class: "control has-icons-left" },
                  input(
                    {
                      type: "password",
                      placeholder: "*******",
                      class: "input",
                      required: "",
                      oninput: (e: Event) => password.val = (e.target as HTMLInputElement).value
                    }),
                  span({ class: "icon is-small is-left" },
                    IconLock(),
                  ),
                ),
              ),
              // div({ class: "field" },
              //   label({ for: "", class: "checkbox" },
              //     input({ type: "checkbox" }),
              //     " Remember me",
              //   ),
              // ),
              div({ class: "field" },
                button(
                  {
                    type: "button",
                    class: "button is-success",
                    onclick: () => {
                      $store.user.login(username.val, password.val)
                        .then((res) => {
                          if (res == 200)
                            window.location.href = redirect ? `./#${redirect}` : "./";
                        });
                    }
                  },
                  "Login",
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  )
}
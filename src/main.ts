import van from "vanjs-core";
import { App } from "./app";

import "./scss/index.scss";

let app = document.getElementById("app") ?? document.body;
van.add(app, App());
// Alternatively, you can write:
// document.body.appendChild(Hello())

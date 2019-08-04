let bodyParser = require("body-parser");
import * as express from "express";
import { router } from "./routes";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
app.use("/task", router);
app.use("/graphql", router);

let handle = null;
if (process.env.NODE_ENV !== "test") {
  handle = app.listen(5000, () => console.log("Running on http://localhost:5000/"));
}
export { app, handle };

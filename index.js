import express from "express";
import router from "./routes/index.js";
import notesRouter from "./routes/notes.js";
import morgan from "morgan";
import { format } from "timeago.js";

const app = express();

//Define the port
const port = process.env.PORT || 4000;

//Add PUG
app.set("view engine", "pug");
app.locals.format = format;

//Gets the current year
app.use((req, res, next) => {
  const year = new Date();
  res.locals.currentYear = year.getFullYear();
  res.locals.webName = "NotesApp!";
  return next();
});

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Add the router
app.use("/", router);
app.use("/mynotes", notesRouter);

//Define public folder
app.use(express.static("public"));

//Starts the server
app.listen(port, () => {
  console.log(`Server working at port: ${port}`);
});

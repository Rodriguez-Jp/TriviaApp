import express from "express";
import router from "./routes/index.js";
import notesRouter from "./routes/notes.js";

const app = express();

//Define the port
const port = process.env.PORT || 4000;

//Add PUG
app.set("view engine", "pug");

//Gets the current year
app.use((req, res, next) => {
  const year = new Date();
  res.locals.currentYear = year.getFullYear();
  res.locals.webName = "NotesApp!";
  return next();
});

//Add the router
app.use("/", router);
app.use("/mynotes", notesRouter);

//Define public folder
app.use(express.static("public"));

//Starts the server
app.listen(port, () => {
  console.log(`Server working at port: ${port}`);
});

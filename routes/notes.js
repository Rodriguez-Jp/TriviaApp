import express from "express";
const notesRouter = express.Router();
import pool from "../database.js";

notesRouter.get("/add", (req, res) => {
  res.render("notes/add", {
    page: "My notes",
  });
});

export default notesRouter;

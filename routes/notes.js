import express from "express";
const notesRouter = express.Router();
import pool from "../database.js";

//Render the add notes page
notesRouter.get("/add", (req, res) => {
  res.render("notes/add", {
    page: "My notes",
  });
});

//Render the page with all the notes
notesRouter.get("/", async (req, res) => {
  const notes = await pool.query("SELECT * FROM notes");
  res.render("notes/notes", {
    notes,
    page: "My notes",
  });
});

//Code to handle the post for the user
notesRouter.post("/add", async (req, res) => {
  const newNote = { ...req.body };

  await pool.query("INSERT INTO notes set ?", [newNote]);
  res.redirect("/mynotes");
});

//Code to handle the delete functionality
notesRouter.get("/delete/:id", async (req, res) => {
  await pool.query("DELETE FROM notes WHERE id=?", req.params.id);
  res.redirect("/mynotes");
});

export default notesRouter;

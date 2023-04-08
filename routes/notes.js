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
  req.flash("success", "Note Added!");
  res.redirect("/mynotes");
});

//Code to handle the delete functionality
notesRouter.get("/delete/:id", async (req, res) => {
  await pool.query("DELETE FROM notes WHERE id=?", req.params.id);
  req.flash("success", "Note deleted successfully!");
  res.redirect("/mynotes");
});

//Code to handle edits
notesRouter.get("/edit/:id", async (req, res) => {
  const note = await pool.query(
    "SELECT * FROM notes WHERE id=?",
    req.params.id
  );
  res.render("notes/edit", { note: note[0] });
});

notesRouter.post("/edit/:id", async (req, res) => {
  console.log(req.body);
  const noteEdited = { ...req.body };
  await pool.query("UPDATE notes SET ? WHERE id = ?", [
    noteEdited,
    req.params.id,
  ]);
  req.flash("success", "Note edited successfully!");
  res.redirect("/mynotes");
});

export default notesRouter;

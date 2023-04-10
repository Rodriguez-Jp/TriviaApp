import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("../views/layout/index", {
    page: "Home",
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    page: "Login",
  });
});

router.get("/aboutus", (req, res) => {
  res.render("aboutus", {
    page: "About us",
  });
});

//Routes to the signup process

export default router;

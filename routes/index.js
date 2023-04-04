import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("../views/layout/index");
});

router.get("/Usuarios", (req, res) => {
  res.render("usuarios");
});

router.get("/Nosotros", (req, res) => {
  res.render("nosotros");
});

export default router;

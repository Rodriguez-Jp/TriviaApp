import express from "express";
import passport from "passport";
import isLoggedIn, { isNotLoggedIn } from "../auth.js";

const authRouter = express.Router();

authRouter.get("/signup", isNotLoggedIn, (req, res) => {
  res.render("auth/signup", {
    page: "Sign up",
  });
});

authRouter.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

authRouter.get("/signin", isNotLoggedIn, (req, res) => {
  res.render("auth/signin", {
    page: "Sign in",
  });
});

authRouter.post("/signin", (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true,
  })(req, res, next);
});

authRouter.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", {
    page: "Profile",
  });
});

authRouter.get("/logout", isLoggedIn, (req, res, next) => {
  req.logOut((error) => {
    if (error) return next(error);
    res.redirect("/signin");
  });
});

export default authRouter;

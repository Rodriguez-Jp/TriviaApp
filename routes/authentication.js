import express from "express";
import passport from "passport";

const authRouter = express.Router();

authRouter.get("/signup", (req, res) => {
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

authRouter.get("/signin", (req, res) => {
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

authRouter.get("/profile", (req, res) => {
  res.send("this is your profile");
});

export default authRouter;

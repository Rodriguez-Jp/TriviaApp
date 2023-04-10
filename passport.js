import passport from "passport";
import Strategy from "passport-local";
import pool from "./database.js";
import helpers from "./helpers.js";

passport.use(
  "local.signin",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT * FROM users WHERE username=?", [
        username,
      ]);

      if (rows.length > 0) {
        const user = rows[0];
        console.log(user.password);
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user, req.flash("success", "Welcome!" + user.username));
        } else {
          done(null, false, req.flash("failure", "Invalid password :("));
        }
      } else {
        done(null, false, req.flash("failure", "That user doesn't exist"));
      }
    }
  )
);

passport.use(
  "local.signup",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { fullname } = req.body;

      const newUser = {
        username,
        password,
        fullname,
      };

      newUser.password = await helpers.encryptPassword(password);
      const result = await pool.query("INSERT INTO users SET ?", [newUser]);
      newUser.id = result.insertId;

      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE id=?", [id]);
  done(null, rows[0]);
});

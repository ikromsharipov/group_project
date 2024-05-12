import { Router } from "express";
import User from "../models/User.js";
import bcrytp from "bcrypt";
import { generateJWTToken } from "../services/token.js";
// import { restart } from 'nodemon';
// import pkg from 'nodemon';

const router = Router();

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register | LMS",
    isRegister: true,
    // registerError: req.flash('registerError'),
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Log in | LMS",
    isLogin: true,
    // loginError: req.flash('loginError'),
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash("loginError", "All fields are required");
    res.redirect("/login");
    return;
  }

  const exitsUser = await User.findOne({ email });
  if (!exitsUser) {
    req.flash("loginError", "User not found");
    res.redirect("/login");
    return;
  }

  const isPassEqual = await bcrytp.compare(password, exitsUser.password);
  if (!isPassEqual) {
    req.flash("loginError", "Password wrong");
    res.redirect("/login");
    return;
  }

  console.log(exitsUser);
  res.redirect("/");
});

router.post("/register", async (req, res) => {
  const { firstname, surname, email, password } = req.body;
  if (!firstname || !surname || !email || !password) {
    req.flash("registerError", "All fields are required");
    res.redirect("/register");
    return;
  }

  const candidate = await User.findOne({ email });

  if (candidate) {
    req.flash("registerError", "User already exist");
    res.redirect("/register");
    return;
  }

  const hashedPassword = await bcrytp.hash(password, 10);
  const userData = {
    firstName: firstname,
    lastName: surname,
    email: email,
    password: hashedPassword,
  };
  const user = await User.create(userData);
  console.log(user);
  const token = generateJWTToken(user._id);
  res.cookie("token", token, { httpOnly: true, secure: true });
  // console.log(token);
  res.redirect("/");
});

export default router;

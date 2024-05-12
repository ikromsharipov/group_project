import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home | LMS",
    token: true,
  });
});

router.get("/courses", (req, res) => {
  res.render("courses", {
    title: "Courses | LMS",
    isCourses: true,
  });
});

router.get("/add", (req, res) => {
  res.render("add", {
    title: "Add | LMS",
    isAdd: true,
  });
});

export default router;

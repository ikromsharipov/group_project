import "dotenv/config";

import express from "express";
import { create } from "express-handlebars";
import mongoose from "mongoose";
import flash from "connect-flash";
import session from "express-session";

// Routes
import AuthRoutes from "./routes/auth.js";
import CoursesRoutes from "./routes/courses.js";

const app = express();

const hbs = create({ defaultLayout: "main", extname: "hbs" });
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "Ikromjon", saveUninitialized: false }));
app.use(flash());

// Connecting to MongoDB database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectDB();

app.use(AuthRoutes);
app.use(CoursesRoutes);

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

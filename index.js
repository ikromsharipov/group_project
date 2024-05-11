import 'dotenv/config'; // Load environment variables

import express from 'express';
import { create } from 'express-handlebars';
import mongoose from 'mongoose';
import flash from 'connect-flash'
import session from 'express-session';

// Routes
import AuthRoutes from './routes/auth.js';
import CoursesRoutes from './routes/courses.js';

const app = express();

  

// Configure Handlebars templating engine
const hbs = create({ defaultLayout: 'main', extname: 'hbs' });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Parse incoming data (URL encoded forms and JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({secret: 'Ikromjon', resave: false, saveUninitialized: false}))
app.use(flash());

// Connect to MongoDB database securely
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      // Construct the full MongoDB URI
      const { user, pass, host, name } = conn.connection;
      const protocol = conn.connection.srv ? 'mongodb+srv://' : 'mongodb://';
      const credentials = user && pass ? `${user}:${pass}@` : '';
      const uri = `${protocol}${credentials}${host}/${name}`;
  
      // Log the full MongoDB URI
      console.log(`MongoDB Connected: ${uri}`);
    } catch (error) {
      console.error(error);
      process.exit(1); // Exit process on connection failure
    }
  };
  
  // Connect to MongoDB before starting the server
  connectDB();
  
  
  

// Mount route handlers from separate files
app.use(AuthRoutes);
app.use(CoursesRoutes);

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

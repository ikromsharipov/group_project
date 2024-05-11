import express from 'express';
import {create} from 'express-handlebars';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'

// Routes
import AuthRoutes from './routes/auth.js';
import CoursesRoutes from './routes/courses.js';

dotenv.config()

const app = express()

const hbs = create({defaultLayout: 'main', extname: 'hbs'})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(AuthRoutes);
app.use(CoursesRoutes);

// console.log(process.env.MONGO_URI);
// Set strictQuery to false
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
        // Additional initialization code can go here
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

/*
{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
},
 */

const PORT = process.env.PORT || 4100
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))

// mongodb+srv://ikromjonsharip:<password>@ikromjon.0jhmppb.mongodb.net/?retryWrites=true&w=majority&appName=ikromjon








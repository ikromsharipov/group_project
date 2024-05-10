import express from 'express';
import {create} from 'express-handlebars'

const app = express()

const hbs = create({defaultLayout: 'main', extname: 'hbs'})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index')
    // res.sendFile(path.join(__dirname, "views", "index.html"))
    // res.send('Main ')
});

app.get('/about', (req, res) => {
    res.render('about')
    // res.sendFile(path.join(__dirname, "views", "about.html"));
});


const PORT = process.env.PORT || 4100
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))










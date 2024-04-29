import express from 'express';
import path from 'path';

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
    res.send('Main page')
})

const PORT = process.env.PORT || 4100
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))










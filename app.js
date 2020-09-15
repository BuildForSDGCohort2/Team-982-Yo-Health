const express = require('express');
const path = require('path');

const app = express();
const port = 8080 || process.env.PORT

app.set('view engine', 'ejs');
console.log(__dirname);

// static files added
app.use('/assets', express.static(path.join(__dirname, '/assets')));
app.use('/blog/assets', express.static(path.join(__dirname, '/assets')));
app.use('/blog/blog-single/assets', express.static(path.join(__dirname, '/assets')));
app.use('/book/Appointment/assets', express.static(path.join(__dirname, '/assets')));





// routes 
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/blog', (req, res) => {
    res.render('blog');
});

app.get('/blog/blog-single', (req, res) => {
    res.render('blog-single');
});

app.get('/blog/blog-single/blog', (req, res) => {
    res.render('blog');
});

app.get('/book/Appointment', (req, res) => {
    res.render('registration');
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
     })
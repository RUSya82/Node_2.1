import express from 'express';

const app = express();

const port = 8000;

app.all('/hello', (req, res, next) => {
    console.log('All');
    res.cookie('token', 'hello', {
        secure: true,
        domain: '/'
    });
    next();
})
app.get('/hello', (req, res) => {
    res.status(201).send('Hello!');
})
app.get('/json', (req, res) => {
    res.status(201).json({request: 'Hello'});
})

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})

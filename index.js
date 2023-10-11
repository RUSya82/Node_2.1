import express from 'express';

const app = express();

const port = 8000;

app.get('/hello', (req, res) => {
    res.send('Hello!');
})

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})

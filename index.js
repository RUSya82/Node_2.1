import express from 'express';
import {router as userRouter} from "./users/users.js";

const app = express();

const port = 8000;

app.use((req, res, next) => {
    console.log('Time', Date.now());
    next();
})
app.all('/hello', (req, res, next) => {
    console.log('All');
    res.cookie('token', 'hello', {
        secure: true,
        domain: '/'
    });
    next();
})
app.use('/users', userRouter);
app.get('/hello', (req, res) => {
    res.status(201).send('Hello!');
})
app.get('/json', (req, res) => {
    res.status(201).json({request: 'Hello'});
})

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})

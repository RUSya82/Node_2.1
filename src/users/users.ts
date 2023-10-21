import express, {Request, Response, NextFunction} from "express";

const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
    res.cookie('token', 'a64cdb5699cad', {
        secure: true,
        domain: '/'
    });
    res.json({
        id: 'a45cbda',
        username: 'Ruslan',
        role: 'admin'
    })
});
router.post('/register', (req: Request, res: Response) => {
    res.cookie('token', 'a64c6541654db5699cad', {
        secure: true,
        domain: '/'
    });
    res.status(201).json({
        id: '6546adbc5a5b',
        username: 'Anton',
        role: 'customer'
    })
})
export { router}
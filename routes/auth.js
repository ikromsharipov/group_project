import {Router} from 'express';
const router = Router();

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register | LMS',
        isRegister: true,
    })
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Log in | LMS',
        isLogin: true,
    })
});

router.post('/login', (req, res) => {
    console.log(req.body);
    res.redirect('/')
});

router.post('/register', (req, res) => {
    console.log(req.body);
    res.redirect('/')
});

export default router;
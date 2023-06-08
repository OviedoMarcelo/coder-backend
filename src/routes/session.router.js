import { Router } from "express";
import passport from "passport";


//Session router
const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register' }), async (req, res) => {
    res.send({ status: 'success', message: 'user registered' })
})

router.get('/fail-register', async (req, res) => {
    res.send({ status: error, message: 'register fail' })
})

router.post('/login', passport.authenticate('login', { failureRedirect: 'fail-login' }), async (req, res) => {
        if (!req.user) {
            return res.status(400).send({ status: 'error', message: 'Invalid user o password' })
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }
        if (req.user.email === 'adminCoder@coder.com') {
            req.session.user.role = 'admin'
        }
        res.send({ status: 'success', message: 'Login success' })
})

router.get('/fail-login', async (req, res) => {
    res.send({ status: "error", message: 'Login fail' })
})

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }
), async (req, res) => {
    res.send({ status: 'success', message: 'User registered successfully' })
});

router.get('/github-callback', passport.authenticate('github', { failureRedirect: '/login' }
), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/home')
})

//Async?
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: 'error', error: 'logout failed' });
        res.redirect('/home');
    })
})



export default router;
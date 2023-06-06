import { Router } from "express";
import passport from "passport";


//Session router
const router = Router();

function auth(req, res, next) {
    if (req.session?.user === 'pepe' && req.session?.admin) {
        return next();
    }

    return res.status(401).send('error de autenticación')
}

router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register' }), async (req, res) => {
    res.send({ status: 'success', message: 'user registered' })
})

router.get('/fail-register', async (req, res) => {
    res.send({ status: error, message: 'register fail' })
})

router.post('/login', passport.authenticate('login', { failureRedirect: 'fail-login' }), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send({ status: 'error', message: 'Invalid user o password' })
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }
        if (email === 'adminCoder@coder.com') {
            req.session.user.role = 'admin'
        }
        res.send({ status: 'success', message: 'Login success' })
    } catch (error) {
        return res.status(500).send({ status: 'error', error });
    }
})

router.get('/fail-login', async (req, res) => {
    res.send({ status: "error", message: 'Login fail' })
})


//Async?
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: 'error', error: 'logout failed' });
        res.redirect('/home');
    })
})



export default router;
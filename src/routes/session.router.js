import { Router } from "express";
import userModel from "../data/models/users.model.js";

//Session router
const router = Router();

function auth(req, res, next) {
    if (req.session?.user === 'pepe' && req.session?.admin) {
        return next();
    }

    return res.status(401).send('error de autenticación')
}

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const exist = await userModel.findOne({ email });

        if (exist) return res.status(400).send({ status: 'error', error: 'El usuario ya existe' });

        const user = {
            first_name,
            last_name,
            email,
            age,
            password,
        }
        await userModel.create(user);
        res.send({ status: 'success', message: 'user registered' })
    } catch (error) {
        return res.status(500).send({ status: 'error', error });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) return res.status(400).send({ status: 'error', error: 'incorrect credentials' })

        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: 'user'
        }
        res.send({ status: 'success', message: 'login success' })

        if (email === 'adminCoder@coder.com' && 'adminCod3r123') {
            req.session.user.role = 'admin'
        }

    } catch (error) {
        return res.status(500).send({ status: 'error', error });
    }
})

//Async?
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: 'error', error: 'logout failed' });
        res.redirect('/home');
    })
})



export default router;
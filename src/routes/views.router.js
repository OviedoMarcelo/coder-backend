import { Router } from "express";

//Initialize router
const router = Router();

//Handlebars render
router.get('/', (req, res) => {
    const user = {
        name: 'Prueba'
    }

    res.render('index', user);
})

router.get('/addproduct', (req, res) => {
    

    res.render('addproduct');
})

export default router;
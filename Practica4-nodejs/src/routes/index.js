import {Router} from 'express'

const router = Router();

router.get('/', (req, res) => res.render('index.ejs', { title: 'Pagina con nodeJS'}));
router.get('/blackJack', (req, res) => res.render('blackJack.ejs', { title: 'blackJack' }));
router.get('/contact', (req, res) => res.render('contact.ejs', { title: 'Contact'}));

export default router;
const router = require('express').Router();
const test = require('./test');
const users = require('./users');
const cities = require('./cities');
const trips = require('./trips');

router.use('/test', test);
router.use('/users', users);
router.use('/cities', cities);
router.use('/trips', trips);

module.exports = router;


// const { auth } = require('../utils');
// const { authController } = require('../controllers');

// module.exports = (app) => {
//     app.get('/', (req,res)=>{
//         res.send('Hello Rest Api')
//     });
    // app.get('/', auth(false), cubeController.home);
    // app.get('/home', auth(false), cubeController.home);

    // app.get('/about', auth(false), cubeController.about);


    // app.get('/login', authController.login);
    // app.post('/login', authController.postLogin);

    // app.get('/register', authController.register);
    // app.post('/register', authController.postRegister);

    // app.get('/logout', authController.logout);

    // app.get('/create', auth(), cubeController.getCreate);
    // app.post('/create', auth(), cubeController.postCreate);


    // app.get('*', (req, res) => {
    //     res.render(`404.hbs`);
    // });
// };
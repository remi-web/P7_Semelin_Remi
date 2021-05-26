const express = require('express');
const router = express.Router();
const userCtrl = require ('../controllers/user');
const auth = require ('../middleware/auth')
const app = express();


router.post('/signup', userCtrl.signup);
router.get('/login',  userCtrl.login);

module.exports = router;


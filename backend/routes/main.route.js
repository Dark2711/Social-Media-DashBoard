const express = require('express');
const userRouter = require('./user.route');
const socialAccountRouter = require('./socialAccount.route');

const router = express.Router();

router.use('/users', userRouter);
router.use('/socials', socialAccountRouter);

module.exports = router;

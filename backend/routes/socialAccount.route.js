const express = require('express');
const {
  addSocialAccount,
  getSocialAccounts,
  updateAccount,
  deleteAccount,
} = require('../controllers/socialAccount.controller');
const authMiddleware = require('../middleware/auth');
const socialAccountRouter = express.Router();

socialAccountRouter.post('/posts', authMiddleware, addSocialAccount);
socialAccountRouter.get('/posts/bulk', authMiddleware, getSocialAccounts);
socialAccountRouter.put('/posts/:id', authMiddleware, updateAccount);
socialAccountRouter.delete('/posts/:id', authMiddleware, deleteAccount);

module.exports = socialAccountRouter;

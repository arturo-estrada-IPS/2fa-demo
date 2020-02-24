const express = require('express');
const authController = require('./../controllers/authenticationController');

function AppRouter() {
  const router = express.Router();

  router.get('/2fa', authController.$2fa);
  router.get('/auhtneticate', authController.$authenticate);
  router.post('/verify', authController.$validate);

  return router;
}

module.exports = AppRouter;

const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const chalk = require('chalk');
const User = require('./../models/User');

const user = new User();

exports.$2fa = (req, res) => {
  const secret = speakeasy.generateSecret();

  user.twoFactorTempSecret = secret.base32;

  qrcode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(`<img src="${dataUrl}" />`);
    }
  });
};

exports.$authenticate = (req, res) => {
  res.send(`<form action='/app/verify' method='post'>Enter Token: <input type='text' name='token' placeholder='Enter Token'/><input type='submit' value='Verify'/></form>`);
};

exports.$validate = (req, res) => {
  const { token } = req.body;
  const secret = user.twoFactorTempSecret;
  const verified = speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token
  });

  if (verified) {
    user.twoFactorSecret = user.twoFactorTempSecret;
    user.twoFactorTempSecret = true;

    console.info(chalk.green('Successful two factor verification'));

    res.send('<p>Your token has been successfully veridied</p>');
  } else {
    console.log(chalk.red('Verification Failed'));

    res.send('<p>Verification Failed</p>');
  }
};

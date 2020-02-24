const chalk = require('chalk');

exports.$404 = (req, res) => {
  console.error(chalk.red(`${req.path} does not exist`));
  res.status(404).send('Sorry cannot find that');
};

exports.$500 = (err, req, res, next) => {
  console.error(chalk.red(err.stack));
  res.status(500).send('An unexpected error ocurred');
};

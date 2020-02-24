const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const morgan = require('morgan');
const AppRouter = require('./router');
const { $500 } = require('./lib/expressCustomMiddleware');

const app = express();
const router = AppRouter();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use($500);
app.use('/app', router);

app.listen(8080, () => console.log(chalk.green('Server is up and running!')));

let bodyParser = require('body-parser');
import * as express from 'express';
import * as morgan from 'morgan';
import {router} from './routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/', router);
app.use('/job', router);
app.use('/task', router);
let handle = null;

if (process.env.NODE_ENV !== 'test') {
	handle = app.listen(5000, () => console.log('started Anna API on port 5000'));
}
export {app, handle}

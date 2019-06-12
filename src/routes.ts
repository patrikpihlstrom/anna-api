import * as express from 'express';
import Job from './controllers/job';

const router = express.Router();

router.get('/', Job.index);
router.get('/get', Job.index);
router.post('/push', Job.push);

export {router};
import * as express from 'express';
import Job from './controllers/job';

const router = express.Router();

router.get('/', Job.index);
router.get('/get', Job.index);
router.post('/push', Job.push);
router.post('/update', Job.update);
router.post('/rm', Job.rm);
router.get('/tasks', Job.tasks);

export {router};
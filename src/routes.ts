import * as express from 'express';
import Job from './controllers/job';

const router = express.Router();

router.get('/', Job.index);
router.get('/get', Job.index);
router.post('/push', Job.push);
router.post('/update', Job.update);
router.post('/rm', Job.rm);

// TODO: get('/tasks') to get the names of tasks that exist in an optional given namespace
// TODO: get('/task?task=$task') to get the tasks that exist in a given namespace

export {router};
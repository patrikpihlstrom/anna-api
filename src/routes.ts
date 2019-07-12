import * as express from 'express';
import Get from './controllers/job/get';
import Push from './controllers/job/push';
import Rm from './controllers/job/rm';
import Update from './controllers/job/update';
import Reserve from './controllers/job/reserve';
import Task from './controllers/task/get';

let router = express.Router();

router.get('/job/get', Get.index);
router.post('/job/push', Push.index);
router.post('/job/update', Update.index);
router.post('/job/rm', Rm.index);
router.post('/job/reserve', Reserve.index);
router.get('/task/:namespace', Task.index);

export {router};
import * as express from 'express';
import Task from './controllers/task/get';
import Graphql from './controllers/graphql';

let router = express.Router();

router.get('/task/:namespace', Task.index);
router.get('/graphql', Graphql.index);
router.post('/graphql', Graphql.index);

export {router};
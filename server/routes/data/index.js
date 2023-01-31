import Router from 'koa-router';
import koaBody from 'koa-body';
import { addSkills, getSkills } from '../../controllers/data';

const DataRouter = new Router();

DataRouter.post('/api/skills', koaBody(), addSkills);
DataRouter.get('/api/skills', getSkills);

export default DataRouter;

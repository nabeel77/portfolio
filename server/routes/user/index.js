import Router from 'koa-router';
import koaBody from 'koa-body';
import { checkUser, autheticateUser } from '../../controllers/user';

const UserRouter = new Router();

UserRouter.post('/api/login', koaBody(), checkUser);
UserRouter.get('/api/authenticate', koaBody(), autheticateUser);

export default UserRouter;

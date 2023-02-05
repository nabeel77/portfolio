import Router from 'koa-router';
import koaBody from 'koa-body';
import { checkUser, autheticateUser } from '../../controllers/user';

const UserRouter = new Router();

UserRouter.post('/api/user/login', koaBody(), checkUser);
UserRouter.get('/api/user/authenticate', koaBody(), autheticateUser);

export default UserRouter;

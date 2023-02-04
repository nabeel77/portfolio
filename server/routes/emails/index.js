import Router from 'koa-router';
import koaBody from 'koa-body';
import { sendAndSaveEmailMessage } from '../../controllers/emails';

const EmailRouter = new Router();

EmailRouter.post('/api/email', koaBody(), sendAndSaveEmailMessage);

export default EmailRouter;

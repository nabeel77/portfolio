import { checkUserCredentials, authenticate } from '../../query';

export const checkUser = async (ctx) => {
  const { username, password } = ctx.request.body;
  const decodedPassword = atob(password);
  const res = await checkUserCredentials(ctx, username, decodedPassword);
  ctx.body = res;
};

export const autheticateUser = async (ctx) => {
  const token = ctx.cookies.get('jwt');
  const result = await authenticate(token);
  ctx.body = result;
};

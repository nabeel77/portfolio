import { userSkills, getUserSkills } from '../../query';

export const addSkills = async (ctx) => {
  const result = await userSkills(ctx, ctx.request.body);
  ctx.body = result;
};

export const getSkills = async (ctx) => {
  let username;
  const cookie = ctx.cookies.get('jwt');
  if (cookie) {
    username = JSON.parse(atob(cookie.split('.')[1])).username;
  }
  const result = await getUserSkills(ctx, username);
  if (result) {
    ctx.body = { status: 'success', result: result.skillSet };
  } else {
    ctx.body = { status: 'success', result: null };
  }
};

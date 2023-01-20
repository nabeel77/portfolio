import { userSkills, getUserSkills } from '../../query';

export const addSkills = async (ctx) => {
  const result = await userSkills(ctx, ctx.request.body);
  ctx.body = result;
};

export const getSkills = async (ctx) => {
  const username = JSON.parse(
    atob(ctx.cookies.get('jwt').split('.')[1])
  ).username;
  const result = await getUserSkills(ctx, username);
  ctx.body = result;
};

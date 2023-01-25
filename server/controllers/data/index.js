import {
  userSkills,
  getUserSkills,
  addProjects,
  getProjects,
} from '../../query';
import { upload } from '../../s3';
import { imagesUpload } from '../../helpers';

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

export const addProjectsController = async (ctx) => {
  const imagePathsObj = Array.isArray(ctx.request.files.image)
    ? await imagesUpload(ctx.request.files.image)
    : await upload(ctx.request.files.image);
  const projectDetails = JSON.parse(ctx.request.body.projectDetails);
  projectDetails.images = imagePathsObj;
  const result = await addProjects(ctx, projectDetails);
  ctx.body = result;
};

export const getProjectsController = async (ctx) => {
  const result = await getProjects(ctx);
  ctx.body = result;
};

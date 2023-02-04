import {
  userSkills,
  getUserSkills,
  addProjects,
  getProjects,
} from '../../query';
import { imagesUpload } from '../../serverHelpers';

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
  const imagesArr = [];
  let imagePathsArr;
  if (!Array.isArray(ctx.request.files.image)) {
    imagesArr.push(ctx.request.files.image);
    imagePathsArr = await imagesUpload(imagesArr);
  } else {
    imagePathsArr = await imagesUpload(ctx.request.files.image);
  }
  const projectDetails = JSON.parse(ctx.request.body.projectDetails);
  projectDetails.images = imagePathsArr;
  const result = await addProjects(ctx, projectDetails);
  ctx.body = result;
};

export const getProjectsController = async (ctx) => {
  const result = await getProjects(ctx);
  ctx.body = result;
};

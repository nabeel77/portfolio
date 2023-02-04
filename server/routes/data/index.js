import Router from 'koa-router';
import koaBody from 'koa-body';
import {
  addSkills,
  getSkills,
  addProjectsController,
  getProjectsController,
} from '../../controllers/data';
import multer from 'koa-multer';

global.__basedir = __dirname;
const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const DataRouter = new Router();

DataRouter.post('/api/skills', koaBody(), addSkills);
DataRouter.get('/api/skills', getSkills);
DataRouter.post(
  '/api/projects',
  koaBody({
    formidable: {
      uploadDir: './uploads/', // directory where files will be uploaded
      keepExtensions: true, // keep file extension on upload
      multiples: true,
    },
    multipart: true,
    urlencoded: true,
    formLimit: '5mb',
  }),
  upload.any('image'),
  addProjectsController
);
DataRouter.get('/api/projects', getProjectsController);

export default DataRouter;

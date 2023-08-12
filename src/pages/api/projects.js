import { getUserProjects, addUserProject } from '../../controllers';
import nextConnect from 'next-connect';
import multer from 'multer';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
});

let uploadFile = upload.any('image');

handler.get(async (req, res) => {
  const result = await getUserProjects(req, res);
  res.status(result.status).json(result.data);
});
handler.use(uploadFile);
handler.post(async (req, res) => {
  try {
    const result = await addUserProject(
      req.files,
      JSON.parse(req.body.projectDetails)
    );
    return res.status(result.status).json(result.data);
  } catch (err) {
    console.log(err);
  }
});

export default handler;

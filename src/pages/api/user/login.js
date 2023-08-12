import { checkUser } from '../../../controllers';

export default async function handler(req, res) {
  const result = await checkUser(req, res);
  res.status(result.status).json(result.data);
}

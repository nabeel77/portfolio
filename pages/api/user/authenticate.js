import { autheticateUser } from '../../../controllers';

export default async function handler(req, res) {
  const result = await autheticateUser(req, res);
  res.status(result.status).json(result.data);
}

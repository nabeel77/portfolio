import { logout } from '../../../controllers';

export default async function handler(req, res) {
  const result = await logout(req, res);
  res.status(result.status).json(result.data);
}

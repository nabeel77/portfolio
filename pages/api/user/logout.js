import { logout } from '../../../controllers';

export default async function handler(req, res) {
  const result = await logout(req, res);
  res.json(result.data);
}

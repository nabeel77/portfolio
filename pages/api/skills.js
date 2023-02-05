import { skills } from '../../controllers';

export default async function handler(req, res) {
  const result = await skills(req, res);
  res.status(result.status).json(result.data);
}

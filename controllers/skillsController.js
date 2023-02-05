import { userSkills, getUserSkills } from '../query';

export const skills = async (req, res) => {
  const { cookies } = req;
  const jwt = cookies.token;
  if (req.method === 'GET') {
    const result = await getUserSkills(
      JSON.parse(atob(jwt.split('.')[1])).username
    );
    if (result) {
      return {
        status: 200,
        data: { status: 'success', result: result.skillSet },
      };
    } else {
      return { status: 200, data: { status: 'success', result: null } };
    }
  } else if (req.method === 'POST') {
    const result = await userSkills(jwt, req.body);
    return result;
  }
};

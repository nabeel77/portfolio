import { checkUserCredentials, authenticate, logoutUser } from '../query';

export const checkUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const decodedPassword = atob(password);
  const result = await checkUserCredentials(res, username, decodedPassword);
  return result;
};

export const autheticateUser = async (req, res) => {
  const { cookies } = req;
  const jwt = cookies.token;
  return jwt
    ? await authenticate(jwt)
    : { status: 400, data: { status: 'error', message: 'Unauthorized user' } };
};

export const logout = async (req, res) => {
  return await logoutUser(res);
};
